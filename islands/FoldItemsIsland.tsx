import { useSignal } from "@preact/signals";
import { TextArea } from "apps/admin/widgets.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Item "abre e fecha".
 * @description Um item de uma coleção de um ou mais items.
 */
export interface FoldItem {
  /**
   * @title Título
   * @description Título do item.
   */
  title?: string;
  /**
   * @title Texto
   * @description Uma prévia do texto vinculado ao item.
   * @widget text-area
   * @default Lorem
   */
  text?: TextArea;
  /**
   * @title Imagens
   */
  image?: IResponsiveImage;
}

interface FoldItemsIslandProps {
  foldItems?: FoldItem[];
}

function FoldItem({ title, text, image }: FoldItem) {
  const isOpen = useSignal<boolean>(false);
  const toggleItem = () => isOpen.value = !isOpen.value;

  return (
    <div
      class={`flex flex-col justify-center items-center w-full gap-y-[8px]`}
    >
      <div
        onClick={toggleItem}
        class={`relative w-full flex flex-col ${
          isOpen.value ? "h-[206px] justify-end" : "h-[42px] justify-center"
        }`}
      >
        <ResponsiveImage
          {...image}
          // className='absolute'
          link={{}}
        />
        <div class="absolute bg-black inset-0 bg-black opacity-25">
        </div>
        <span
          class={`absolute text-white font-semibold text-[26px] ${
            isOpen.value ? "pl-[16px] pb-[8px]" : "pl-[16px]"
          }`}
        >
          {title}
        </span>
      </div>

      <div
        class={`${
          isOpen.value ? "h-full" : "hidden"
        } overflow-hidden flex flex-col items-start gap-[8px] py-[16px]`}
      >
        <h4 class={`text-[#041E50] font-semibold text-[26px]`}>
          {title}
        </h4>
        <p class={`text-[#2B2936] text-[14px]`}>{text}</p>
      </div>
    </div>
  );
}

export default function FoldItemsIsland({ foldItems }: FoldItemsIslandProps) {
  const selectedItem = useSignal<number>(0);

  return (
    <div
      class={`
        foldItems-container
        w-full flex flex-col
        lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[1fr] lg:gap-x-[32px]
      `}
    >
      <div class="w-full flex flex-col gap-y-[8px] lg:hidden">
        {foldItems &&
          foldItems.map((item, index) => (
            <FoldItem
              title={item.title}
              text={item.text}
              image={item.image}
              key={index}
            />
          ))}
      </div>

      <div
        class={`
          hidden relative
          lg:flex lg:flex-row lg:items-center lg:justify-center lg:h-full lg:gap-x-[8px]
        `}
      >
        {foldItems && foldItems.map((item, index) => (
          <div
            key={index}
            class={`
              relative cursor-pointer
              transition-all duration-300 ease-in-out
              ${
              index === selectedItem.value
                ? "w-[380px] h-full"
                : "w-[120px] h-[486px]"
            }
            `}
            onClick={() => selectedItem.value = index}
          >
            <ResponsiveImage
              {...item.image}
              // class={`h-full w-full object-cover`}
              link={{}}
            />
            <div class="absolute inset-0 bg-black opacity-40"></div>
            <span
              class={`
                absolute bottom-4 
                ${
                index === selectedItem.value ? "left-[388px]" : "left-[132px]"
              }
                text-white font-semibold text-[26px]
                -rotate-90 transform origin-bottom-left whitespace-nowrap pb-4 pl-4
              `}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div class="hidden lg:flex flex-col justify-center items-start gap-[16px] pr-8">
        <h2 class="text-[#041E50] font-bold text-4xl">
          {foldItems && foldItems[selectedItem.value].title}
        </h2>
        <p class="text-[#2B2936] text-base">
          {foldItems && foldItems[selectedItem.value].text}
        </p>
      </div>
      <style>
        {`
        @media screen and (min-width: 1280px) {
          .foldItems-container {
            max-width: 1200px;
            height: 540px;
          }
        }
        
        @media screen and (min-width: 1440px) {
          .foldItems-container {
            max-width: 1360px;
          }
        }
        
        @media screen and (min-width: 1920px) {
          .foldItems-container {
            max-width: 1600px;
          }
        }
      `}
      </style>
    </div>
  );
}
