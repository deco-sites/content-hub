import ProductShelf from "site/islands/ProductShelf.tsx";
import Section from "site/components/ui/Section.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
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
}

export default function ProductShelfSection({
  section,
  configs,
  products,
  background,
  text,
  link,
  reverse = false
}: Props) {
  const id = useId();
  const hasProducts = !!products?.length;

  const { srcDesktop, srcMobile, alt } = background ?? {};

  const { autoplay = {} } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const sliderConfig: ISliderConfigs = {
    ...configs,
    autoplay: autoplayConfig,
    slidesPerView: configs?.slidesPerView ?? 1.5,
    navigation: configs?.navigation?.enabledMobile
      ? { enabled: configs?.navigation?.enabledMobile }
      : { enabled: false },
    pagination: configs?.pagination?.enabledMobile
      ? { enabled: configs?.pagination?.enabledMobile }
      : { enabled: true },
    breakpoints: {
      768: {
        slidesPerView: 2,
        navigation: configs?.navigation?.enabledDesktop
          ? { enabled: configs?.navigation?.enabledDesktop }
          : { enabled: true },
        pagination: configs?.pagination?.enabledDesktop
          ? { enabled: configs?.pagination?.enabledDesktop }
          : { enabled: false }
      },
      1280: {
        slidesPerView: 3,
        navigation: configs?.navigation?.enabledDesktop
          ? { enabled: configs?.navigation?.enabledDesktop }
          : { enabled: true },
        pagination: configs?.pagination?.enabledDesktop
          ? { enabled: configs?.pagination?.enabledDesktop }
          : { enabled: false }
      }
    }
  } as ISliderConfigs;

  console.log({ sliderConfig, configs });

  const minimalProducts = products?.map(
    ({ url, isVariantOf, offers, image }) => {
      return {
        url,
        isVariantOf,
        offers,
        image
      };
    }
  );

  return (
    <Section
      {...section}
      id={id}
      classesContainer="product-shelf-section mx-auto lg:px-4 lg:max-w-[98.5rem] xl:max-w-[calc(100.1rem+32px)]"
      fullWidth
    >
      <div class="flex flex-col items-center justify-center relative w-full">
        {(srcDesktop || srcMobile) && (
          <div
            class={`flex w-full top-0 left-0 absolute -z-[1] max-h-[475px] lg:[position:initial] lg:max-h-[initial] ${
              !reverse ? "justify-end" : "justify-start"
            }`}
          >
            <Picture class="flex w-full max-w-[1094px]" preload={false}>
              {srcMobile && (
                <Source
                  srcSet={srcMobile}
                  media="(max-width: 1023px)"
                  height={441}
                  src={srcMobile}
                  width={375}
                />
              )}

              {srcDesktop && (
                <img
                  alt={alt}
                  class="w-full object-cover lg:flex-row-reverse"
                  src={srcDesktop}
                />
              )}
            </Picture>
          </div>
        )}

        <div
          class={`flex w-full items-center justify-center flex-col-reverse lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-2/4 gap-[50px] lg:gap-[10px] ${
            !reverse ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          <div class="flex w-full lg:max-w-[calc(65%-5px)] lg:px-[50px] xl:max-w-[calc(75%-5px)] ">
            {hasProducts && (
              <ProductShelf
                products={minimalProducts}
                rootId={id}
                configs={sliderConfig}
              />
            )}
          </div>
          <div
            class={`product-shelf-section__text flex w-full h-full pt-[84px] px-4 lg:px-0 lg:pt-0 lg:max-w-[calc(35%-5px)] xl:max-w-[calc(25%-5px)] ${
              !reverse ? "lg:pr-4" : "lg:pl-4"
            }`}
          >
            {(text || link) && (
              <div class="flex gap-4 flex-col">
                {text && (
                  <div class="flex">
                    <Text title={text} />
                  </div>
                )}
                {link && link.text && (
                  <div class="flex">
                    <a
                      href={link.href}
                      class="cursor-pointer flex items-center justify-center leading-[24px] text-base font-semibold text-center h-[40px] px-6 bg-[#617f57] text-white hover:bg-[#99b293] transition-all ease-in duration-300"
                    >
                      {link.text}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "500px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
