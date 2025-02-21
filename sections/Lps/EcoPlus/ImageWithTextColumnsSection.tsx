import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";

interface IBlockText {
  /**
   * @title Texto
   * @description Conteúdo em formato de rich text.
   * @format rich-text
   * @default Lorem ipsum
   */
  text?: string;

  /**
   * @title Cor do Texto
   * @description Define a cor do texto.
   * @format color-input
   * @default #000000
   */
  textColor?: string;

  /**
   * @title Cor de Fundo
   * @description Define a cor de fundo do bloco de texto.
   * @format color-input
   * @default #ffffff
   */
  backgroundColor?: string;
}

interface Props {
  /**
   * @title Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Conteúdo à Esquerda
   * @description Bloco de texto exibido no lado esquerdo da seção.
   */
  left?: IBlockText;

  /**
   * @title Conteúdo à Direita
   * @description Bloco de texto exibido no lado direito da seção.
   */
  right?: IBlockText;

  /**
   * @title Imagem
   * @description Imagem responsiva exibida na seção.
   */
  image?: IResponsiveImage;
}

export default function ImageWithTextColumnsSection({
  section,
  left,
  image = {},
  right,
}: Props) {
  const id = useId();

  const {
    text: lText,
    textColor: lTextColor,
    backgroundColor: lBackgroundColor,
  } = left ?? {};

  const {
    text: rText,
    textColor: rTextColor,
    backgroundColor: rBackgroundColor,
  } = right ?? {};

  return (
    <Section
      {...section}
      id={id}
      classesContainer="image-with-text-columns-section p-0 xl:px-4"
    >
      <div class="flex flex-col min-h-[520px] lg:flex-row lg:gap-2">
        <div
          class="flex items-center w-full p-5 md:p-[1.5vh_5vw] lg:p-[1.5vh_3vw] xl:p-[1.5vw_3vw] xl:w-[33%] xl:text-right"
          style={{
            backgroundColor: lBackgroundColor,
            color: lTextColor,
          }}
        >
          <Text title={lText ?? ""} />
        </div>
        <div class="flex w-full xl:w-[33.3%]">
          <ResponsiveImage
            {...image}
            sizes={{ height: 520, width: 520, maxHeight: 520 }}
          />
        </div>
        <div
          class="flex items-center w-full p-5 md:p-[1.5vh_5vw] lg:p-[1.5vh_3vw] xl:p-[0_3vw] xl:w-[33.3%]"
          style={{
            backgroundColor: rBackgroundColor,
            color: rTextColor,
            textAlign: "left",
          }}
        >
          <Text title={rText ?? ""} />
        </div>
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[984px] lg:h-[661px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
