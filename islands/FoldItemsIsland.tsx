import { useSignal } from "@preact/signals";
import { TextArea } from "apps/admin/widgets.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Seção de Artigos em Grid
 * @description Exibe artigos em um grid responsivo (4 colunas no desktop e 2 no mobile).
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

export default function FoldItemsIsland({ foldItems }: FoldItemsIslandProps) {
  const isOpen = useSignal<boolean>(false);

  const toggleItem = () => isOpen.value = !isOpen.value;

  return (
    <>
      <div id="foldItems-container" class={`foldItems-container__mobile w-full`}>
        {foldItems.length
          ? (
            foldItems.map((item, index) => (
              <>
                <div
                  key={index}
                  class={`foldItems-item__mobile flex flex-col justify-center items-center w-full`}
                >
                  <div
                    onClick={toggleItem}
                    class={`foldItems-item-image__mobile relative w-full flex flex-col ${isOpen.value
                      ? "h-[206px] justify-end"
                      : "h-[42px] justify-center"
                      }`}
                  >
                    <ResponsiveImage {...item.image} class={`absolute`} link={{}} />
                    <div class="absolute bg-black inset-0 bg-black opacity-25">
                    </div>
                    <span
                      class={`absolute text-white font-semibold text-[26px] ${isOpen.value ? "pl-[16px] pb-[8px]" : "pl-[16px]"
                        }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div
                    onClick={toggleItem}
                    class={`foldItems-item-image__desktop relative w-full flex ${isOpen.value
                      ? "h-[206px] justify-end"
                      : "h-[42px] justify-center"
                      }`}
                  >
                    <ResponsiveImage {...item.image} class={`absolute`} link={{}} />
                    <div class="absolute bg-black inset-0 bg-black opacity-25">
                    </div>
                    <span
                      class={`absolute text-white font-semibold text-[26px] ${isOpen.value ? "pl-[16px] pb-[8px]" : "pl-[16px]"
                        }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div
                    class={`foldItems-item-info ${isOpen.value ? "h-full" : "hidden"
                      } overflow-hidden flex flex-col items-start gap-[8px] py-[16px]`}
                  >
                    <h4 class={`text-[#041E50] font-semibold text-[26px]`}>
                      {item.title}
                    </h4>
                    <p class={`text-[#2B2936] text-[14px]`}>{item.text}</p>
                  </div>
                </div>
              </>
            ))
          )
          : (
            "FoldItemsSection: não há itens a serem renderizados."
          )}
      </div>
      {/* <div class={`foldItems-container__desktop w-full`}>
        {foldItems.length
          ? (
            foldItems.map((item, index) => (
              <>
                <div
                  key={index}
                  class={`foldItems-item__desktop flex flex-col justify-center items-center w-full`}
                >
                  <div
                    onClick={toggleItem}
                    class={`foldItems-item-image__desktop relative w-full flex ${isOpen.value
                      ? "h-[206px] justify-end"
                      : "h-[42px] justify-center"
                      }`}
                  >
                    <ResponsiveImage {...item.image} class={`absolute`} link={{}} />
                    <div class="absolute bg-black inset-0 bg-black opacity-25">
                    </div>
                    <span
                      class={`absolute text-white font-semibold text-[26px] ${isOpen.value ? "pl-[16px] pb-[8px]" : "pl-[16px]"
                        }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div
                    class={`foldItems-item-info ${isOpen.value ? "h-full" : "hidden"
                      } overflow-hidden flex flex-col items-start gap-[8px] py-[16px]`}
                  >
                    <h4 class={`text-[#041E50] font-semibold text-[26px]`}>
                      {item.title}
                    </h4>
                    <p class={`text-[#2B2936] text-[14px]`}>{item.text}</p>
                  </div>
                </div>
              </>
            ))
          )
          : (
            "FoldItemsSection: não há itens a serem renderizados."
          )}
      </div> */}

      <style>
        {`
          #foldItems-container [class*='__desktop'] {
            display: none;
          }
        
          @media screen and (min-width: 1024px) {
            #foldItems-container [class*='__mobile'] {
                display: none;
            }
          }
        `}
      </style>
    </>
  );
}
