import Section from "site/components/ui/Section.tsx";
import { InfoIcon } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title {{#title}}{{title}}{{/title}}{{^title}}Ícone{{/title}}
 */
interface IconItem {
  /**
   * @title Texto alternativo
   * @description Texto descritivo para a imagem do ícone.
   */
  alt?: string;

  /**
   * @format color-input
   * @default #ffffff
   * @title Cor de fundo
   * @description Cor de fundo do ícone.
   */
  boxBackgroundColor?: string;

  /**
   * @format color-input
   * @default #617f57
   * @title Cor de fundo ao passar o mouse
   * @description Cor de fundo do ícone quando o mouse passa sobre ele.
   */
  boxBackgroundColorHover?: string;

  /**
   * @format image-uri
   * @title Fonte da imagem
   * @description URL da imagem do ícone.
   */
  imageSrc?: string;

  /**
   * @title Link de redirecionamento
   * @description URL para onde o usuário será redirecionado ao clicar no ícone.
   */
  redirect?: string;

  /**
   * @title Abrir em nova aba
   * @description Define se o link será aberto em uma nova aba.
   * @default false
   */
  target?: boolean;

  /**
   * @title Título
   * @description Título do ícone exibido ao usuário.
   */
  title?: string;
}

interface Props {
  /**
   * @title Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Ícones
   * @description Lista de ícones a serem exibidos na seção.
   */
  icons?: IconItem[];
}

export default function CategoriesSection({ icons = [], section }: Props) {
  const id = useId();

  return (
    <>
      <Section {...section} id={id} classesContainer="px-6">
        <div className="categories-section flex items-center gap-3 flex-wrap justify-center w-full h-full">
          {icons?.map((icon, index) => {
            const {
              boxBackgroundColorHover,
              boxBackgroundColor,
              title,
              alt,
              redirect,
              imageSrc,
              target
            } = icon ?? {};

            return (
              <>
                <div
                  key={index}
                  className={`categories-section__container box-border px-1 flex items-center text-center flex-col justify-center border border-solid border-[#eaebed] rounded-[2px] transition-all ease-in duration-300 group w-[100px] h-[100px] lg:w-[130px] lg:h-[130px]`}
                  style={{
                    background: boxBackgroundColor
                  }}
                >
                  <InfoIcon
                    title={title}
                    image={{
                      alt,
                      redirect,
                      imageSrc,
                      target
                    }}
                    classes={{
                      containerLink: "gap-1",
                      image:
                        "max-sm:w-[24px] max-sm:h-[24px] group-hover:[filter:brightness(0)_invert(1)] transition-all duration-300 ease-in",
                      title:
                        "text-[#011e41] text-xs leading-[initial] group-hover:text-[#fff] transition-all duration-300 ease-in lg:min-h-[48px] lg:text-base"
                    }}
                  />
                </div>
                <style>
                  {`
                    .categories-section__container:hover {
                      background: ${boxBackgroundColorHover} !important;
                    }
                  `}
                </style>
              </>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "500px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
