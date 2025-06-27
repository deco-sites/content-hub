import ProductShelf from "site/islands/ProductShelf.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import { isEmptyText } from "site/utils/text.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { Product } from "apps/commerce/types.ts";

interface IBackground {
  /**
   * @title Imagem (desktop)
   * @format image-uri
   */
  srcDesktop?: string;

  /**
   * @title Imagem (mobile)
   * @format image-uri
   */
  srcMobile?: string;

  /**
   * @title Alt
   * @description Atributo de texto alternativo (SEO)
   */
  alt?: string;
}

/**
 * @description Componente de seção contendo um slider de produtos.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Direção do Conteúdo
   * @description Define a disposição do conteúdo dentro da seção.
   * @default false
   */
  reverse?: boolean;

  /**
   * @title Imagem de Fundo
   * @description Define a imagem de fundo na seção da prateleira de produtos.
   * @format image-uri
   */
  background?: IBackground;

  /**
   * @title Texto Sobreposto à Imagem
   * @description Texto exibido sobre a imagem de fundo da seção.
   * @format rich-text
   */
  text?: string;

  /**
   * @title Botão de Ação (Call to Action)
   * @description Define um botão com link para direcionar o usuário a outra página.
   */
  link?: {
    /**
     * @title Texto do Botão
     * @description Define o texto exibido dentro do botão de ação.
     */
    text?: string;

    /**
     * @title URL de Destino
     * @description Endereço para onde o usuário será redirecionado ao clicar no botão.
     */
    href?: string;

    /**
     * @title Cor de fundo do botão
     * @description Define a cor de fundo do botão.
     * @format color-input
     * @default #000000
     */
    bgColor?: string;
  };

  /**
   * @title Lista de Produtos
   * @description Conjunto de produtos a serem exibidos dentro do slider.
   */
  products?: Product[] | null;

  /**
   * @title Configurações do Slider
   * @description Define os parâmetros de exibição e comportamento do slider.
   */
  configs?: ISliderConfigs;

  /**
   * @title Largura Completa
   * @description Define se a seção ocupará a largura total da tela. Quando ativado, o conteúdo se estende por toda a largura disponível.
   * @default false
   */
  fullWidth?: boolean;
}

export default function ProductShelfSection(
  {
    section,
    configs,
    products,
    background,
    text,
    link,
    reverse = false,
  }: Props,
): preact.JSX.Element {
  const id = useId();
  const hasProducts = !!products
    ?.length;
  const { srcDesktop, srcMobile, alt } = background ?? {};

  const sliderConfig: ISliderConfigs = {
    ...configs,
    spaceBetween: 8,
    slidesPerView: 1.5,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  } as ISliderConfigs;

  const minimalProducts = products?.map(
    (
      {
        url,
        isVariantOf,
        offers,
        image,
      },
    ) => {
      return {
        url,
        isVariantOf,
        offers,
        image,
      };
    },
  );

  const isCustomShelf = !isEmptyText(text) ||
    !isEmptyText(link?.text);
  const hasBackground = !!srcDesktop ||
    !!srcMobile;

  return (
    <Section
      {...section}
      id={id}
      classesContainer="product-shelf-section mx-auto"
      fullWidth={isCustomShelf}
    >
      <div
        class={`flex flex-col items-center justify-center relative w-full ${
          isCustomShelf ? "lg:w-full" : ""
        }`}
      >
        {hasBackground && (
          <div
            class={`flex w-full top-0 left-0 absolute -z-[1] max-h-[475px] lg:[position:initial] lg:max-h-[initial] ${
              !reverse ? "justify-end" : "justify-start"
            }`}
          >
            <div class="flex w-full max-w-[1094px]">
              <ResponsiveImage
                src={{
                  desktop: srcDesktop,
                  mobile: srcMobile,
                }}
                sizes={{
                  widthMobile: 375,
                  heightMobile: 441,
                }}
                loadingOptions={{
                  preload: false,
                }}
                alt={alt}
              />
            </div>
          </div>
        )}

        <div
          class={`flex w-full items-center justify-center ${
            isCustomShelf
              ? "flex-col-reverse gap-[50px] lg:max-w-[calc(100.1rem+32px)] lg:gap-[10px] lg:mx-auto"
              : ""
          } ${hasBackground ? "lg:absolute lg:top-1/2 lg:-translate-y-2/4" : ""}
              ${
            !reverse && isCustomShelf ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          <div
            class={`flex w-full ${
              isCustomShelf
                ? "lg:max-w-[calc(65%-5px)] lg:px-[50px] xl:max-w-[calc(75%-5px)]"
                : ""
            }`}
          >
            {hasProducts && (
              <ProductShelf
                products={minimalProducts}
                rootId={id}
                configs={sliderConfig}
              />
            )}
          </div>

          {isCustomShelf && (
            <div
              class={`product-shelf-section__text items-center flex w-full h-full pt-[84px] px-4 lg:px-0 lg:pt-0 lg:max-w-[calc(35%-5px)] xl:max-w-[calc(25%-5px)] ${
                !reverse ? "lg:pr-4" : "lg:pl-4"
              }`}
            >
              <div class="flex gap-4 flex-col">
                {text && (
                  <div class="flex">
                    <Text
                      title={text}
                    />
                  </div>
                )}
                {link?.text && (
                  <div class="flex">
                    <a
                      href={link.href ??
                        "/"}
                      class="relative overflow-hidden cursor-pointer flex items-center justify-center leading-[24px] text-base font-semibold text-center h-[40px] px-6 text-white before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:pointer-events-none before:bg-white before:bg-opacity-20 before:opacity-0 before:transition-all before:ease-in before:duration-300 hover:before:opacity-100"
                      style={{
                        background: link
                          .bgColor ??
                          "#000000",
                      }}
                    >
                      <span>
                        {link.text}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "500px" }}
      class="flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
