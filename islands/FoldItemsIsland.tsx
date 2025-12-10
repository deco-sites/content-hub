import { useSignal } from "@preact/signals";
import { Text } from "@eluxlab/library-components";
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

  cta?: {
    /**
     * @title Texto CTA
     * @description Texto do CTA vinculado ao item (mesmo do atributo title).
     * @default Lorem
     */
    text?: string;
    /**
     * @title Link CTA
     * @description Link do CTA vinculado ao item.
     * @default /#
     */
    link?: string;
    /**
     * @title Abrir em nova aba?
     * @description Caso seja selecionada, esta opção irá permitir que o link abra em uma nova aba.
     * @default _blank
     */
    target?: "_blank" | "_self";
  };

  /**
   * @title Imagens
   */
  image?: IResponsiveImage;
}

interface FoldItemsIslandProps {
  foldItems?: FoldItem[];
}

function FoldItem({
  title,
  text,
  image,
  cta,
}: {
  title?: string;
  text?: string;
  image?: IResponsiveImage;
  cta?: {
    text?: string;
    link?: string;
    target?: string;
  };
}) {
  const isOpen = useSignal<boolean>(false);
  const toggleItem = () => (isOpen.value = !isOpen.value);

  return (
    <div class={`flex flex-col justify-center items-center w-full gap-y-[8px]`}>
      <div
        onClick={toggleItem}
        class={`relative w-full flex flex-col ${
          isOpen.value ? "h-[206px] justify-end" : "h-[42px] justify-center"
        }`}
      >
        <ResponsiveImage {...image} link={{}} />
        <div class="absolute bg-black inset-0 opacity-25"></div>
        <Text
          title={title ?? ""}
          classes={{
            container: `absolute text-white font-semibold text-[26px] pl-[16px] ${
              isOpen.value ? "pb-[8px]" : "pl-[16px]"
            }`,
          }}
        />
      </div>

      <div
        class={`${
          isOpen.value ? "h-full" : "hidden"
        } overflow-hidden flex flex-col items-start gap-[8px] py-[16px]`}
      >
        <Text
          title={title ?? ""}
          classes={{ container: "text-[#041E50] font-semibold text-[26px]" }}
        />
        <p class={`text-[#2B2936] text-[14px]`}>{text}</p>
        {cta?.text && (
          <a
            href={cta?.link || "#"}
            target={cta?.target}
            rel={cta?.target === "_blank" ? "noopener noreferrer" : ""}
            class="foldItemDesktopCTA text-[#fff] bg-[#041e50] text-base flex items-center justify-center rounded-[4px] border-0 btn btn-md font-semibold mx-auto"
            title={cta?.text}
            aria-label={cta?.text || "CTA button"}
          >
            {cta?.text}
          </a>
        )}
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
        lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[1fr] lg:gap-x-[16px] xl:gap-x-[32px]
        lg:overflow-hidden
      `}
    >
      <div class="w-full flex flex-col gap-y-[8px] lg:hidden">
        {foldItems?.map((item, index) => (
          <FoldItem
            title={item.title}
            text={item.text}
            image={item.image}
            cta={item.cta}
            key={index}
          />
        ))}
      </div>

      <div
        class={`
          hidden relative
          lg:flex lg:flex-row lg:items-center lg:justify-start lg:h-full lg:gap-x-[6px] xl:gap-x-[8px]
          lg:max-w-full lg:overflow-hidden
        `}
      >
        {foldItems?.map((item, index) => (
          <div
            key={index}
            class={`
              fold-item
              relative cursor-pointer flex-shrink-0
              transition-all duration-300 ease-in-out
              overflow-hidden
            `}
            data-selected={index === selectedItem.value}
            onClick={() => (selectedItem.value = index)}
          >
            <ResponsiveImage {...item.image} link={{}} />
            <div class="absolute inset-0 bg-black opacity-40"></div>
            <Text
              title={item.title ?? ""}
              classes={{
                container: `fold-item-title absolute text-white font-semibold -rotate-90 transform origin-bottom-left whitespace-nowrap`,
              }}
            />
          </div>
        ))}
      </div>

      <div class="hidden lg:flex flex-col justify-center items-start gap-[16px] lg:pr-4 xl:pr-8 lg:min-w-0 lg:overflow-hidden">
        <Text
          title={foldItems?.[selectedItem.value].title ?? ""}
          classes={{
            container: "text-[#041E50] font-bold lg:text-2xl xl:text-4xl break-words",
          }}
        />
        <p class="text-[#2B2936] text-sm xl:text-base break-words">
          {foldItems?.[selectedItem.value].text}
        </p>
        {foldItems?.[selectedItem.value]?.cta?.text && (
          <a
            href={foldItems?.[selectedItem.value]?.cta?.link || "#"}
            target={foldItems?.[selectedItem.value]?.cta?.target}
            rel={
              foldItems?.[selectedItem.value]?.cta?.target === "_blank"
                ? "noopener noreferrer"
                : ""
            }
            class="foldItemDesktopCTA text-[#fff] bg-[#041e50] text-base flex items-center justify-center rounded-[4px] border-0 btn btn-md font-semibold"
            title={foldItems?.[selectedItem.value]?.cta?.text}
            aria-label={
              foldItems?.[selectedItem.value]?.cta?.text || "CTA button"
            }
          >
            {foldItems?.[selectedItem.value]?.cta?.text}
          </a>
        )}
      </div>
      <style>
        {`
        @media screen and (min-width: 1024px) {
          .foldItems-container {
            height: 440px;
          }

          .fold-item {
            width: 90px;
            height: 380px;
          }

          .fold-item[data-selected="true"] {
            width: 280px;
            height: 100%;
          }

          .fold-item-title {
            font-size: 20px;
            bottom: 16px;
            padding-bottom: 16px;
            padding-left: 16px;
            left: 98px;
          }

          .fold-item[data-selected="true"] .fold-item-title {
            left: 288px;
          }
        }

        @media screen and (min-width: 1280px) {
          .foldItems-container {
            height: 540px;
          }

          .fold-item {
            width: 120px;
            height: 486px;
          }

          .fold-item[data-selected="true"] {
            width: 380px;
            height: 100%;
          }

          .fold-item-title {
            font-size: 26px;
            bottom: 16px;
            padding-bottom: 16px;
            padding-left: 16px;
            left: 132px;
          }

          .fold-item[data-selected="true"] .fold-item-title {
            left: 388px;
          }
        }
      `}
      </style>
    </div>
  );
}
