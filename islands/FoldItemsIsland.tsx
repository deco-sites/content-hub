import { useSignal } from "@preact/signals";
import { TextArea } from "apps/admin/widgets.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Seção de items "abre e fecha".
 * @description Exibe um item ou uma coleção de items que abrem e fecham a partir do click ou toque na imagem.
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

function FoldItem({ foldItem }: FoldItem) {
  const { title, text, image } = foldItem
  const isOpen = useSignal<boolean>(false);
  const toggleItem = () => isOpen.value = !isOpen.value;

  return (
    <div
      class={`flex flex-col justify-center items-center w-full gap-y-[8px]`}
    >
      <div
        onClick={toggleItem}
        class={`relative w-full flex flex-col ${isOpen.value
          ? "h-[206px] justify-end"
          : "h-[42px] justify-center"
          }`}
      >
        <ResponsiveImage
          {...image}
          class={`absolute`}
          link={{}}
        />
        <div class="absolute bg-black inset-0 bg-black opacity-25">
        </div>
        <span
          class={`absolute text-white font-semibold text-[26px] ${isOpen.value ? "pl-[16px] pb-[8px]" : "pl-[16px]"
            }`}
        >
          {title}
        </span>
      </div>
      <div
        class={`${isOpen.value ? "h-full" : "hidden"
          } overflow-hidden flex flex-col items-start gap-[8px] py-[16px]`}
      >
        <h4 class={`text-[#041E50] font-semibold text-[26px]`}>
          {title}
        </h4>
        <p class={`text-[#2B2936] text-[14px]`}>{text}</p>
      </div>
    </div>
  )
}

export default function FoldItemsIsland({ foldItems }: FoldItemsIslandProps) {
  return (
    <div
      class={`w-full flex flex-col gap-y-[8px]`}
    >
      {foldItems.length
        ? (
          foldItems.map((item, index) => (
            <FoldItem foldItem={item} key={index} />
          ))
        )
        : (
          "FoldItemsSection: não há itens a serem renderizados."
        )}
    </div>
  )
}
