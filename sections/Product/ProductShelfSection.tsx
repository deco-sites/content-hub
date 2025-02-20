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
  link
}: Props) {
  const id = useId();
  const hasProducts = !!products?.length;

  const { srcDesktop, srcMobile, alt } = background ?? {};

  const { autoplay = {}, slidesPerView = 1.5 } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const sliderConfig = {
    ...configs,
    autoplay: autoplayConfig,
    navigation: {
      enabled: configs?.navigation?.enabledMobile ?? false
    },
    slidesPerView,
    pagination: {
      enabled: configs?.pagination?.enabledMobile ?? false
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        navigation: {
          enabled: configs?.navigation?.enabledDesktop ?? true
        },
        pagination: {
          enabled: configs?.pagination?.enabledDesktop ?? false
        }
      }
    }
  } as ISliderConfigs;

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
      classesContainer="product-shelf-section mx-auto"
    >
      <div class="flex flex-col relative w-full mx-auto min-h-[850px] lg:min-h-[600px] lg:max-w-[1366px]">
        {(srcDesktop || srcMobile) && (
          <div class="flex h-full product-shelf-section__background lg:absolute lg:right-0 lg:h-[600px]">
            {(text || link) && (
              <div class="flex gap-4 flex-col top-14 absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[370px]">
                {text && (
                  <div class="flex mx-4">
                    <Text title={text} />
                  </div>
                )}
                {link && link.text && (
                  <div class="flex mx-4">
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

            <Picture class="flex w-full h-[475px] lg:h-[600px]" preload={false}>
              {srcMobile && (
                <Source
                  srcSet={srcMobile}
                  media="(max-width: 1023px)"
                  height={475}
                  src={srcMobile}
                  width={1000}
                />
              )}

              {srcDesktop && (
                <img alt={alt} class="w-full object-cover" src={srcDesktop} />
              )}
            </Picture>
          </div>
        )}

        <div class="flex gap-6 w-full overflow-hidden absolute top-[250px] left-1/2 -translate-x-1/2 lg:[position:initial] lg:[transform:unset] lg:w-[65%] lg:pt-5">
          {hasProducts && (
            <ProductShelf
              products={minimalProducts}
              rootId={id}
              configs={sliderConfig}
            />
          )}
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
