import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ProductShelf from "site/islands/ProductShelf.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { useId } from "site/sdk/useId.ts";

interface ProductMediaBannerSectionProps {
  /**
 * @title Configuração da seção
 * @description Define o título, subtítulo e espaçamento da seção.
 */
  section?: ISection;

  /**
   * @title Lista de produtos
   * @description Conjunto de produtos a serem exibidos dentro do slider.
   */
  products?: Product[] | null;

  /**
  * @title Direção do conteúdo
  * @description Troca a direção do conteúdo na seção.
  * @default false
  */
  reverse?: boolean;

  /**
    * @title É vídeo?
    * @description Caso seja selecionada, esta opção faz com que seja renderizado um vídeo ao invés de uma imagem.
    * @format string
    */
  isVideo?: boolean;

  /**
  * @title Imagem
  * @description Imagem que aparecerá ao lado do produto.
  * @format string
  */
  image?: IResponsiveImage;

  /**
  * @title Video
  * @description Video que aparecerá ao lado do produto.
  * @format string
  */
  video?: {
    /**
     * @title URL do vídeo
     * @description URL do vídeo.
     * @format video-uri
     */
    src?: string;

    /**
     * @title Titulo do vídeo
     * @description Texto descritivo para acessibilidade.
     */
    title?: string;

    /**
     * @title Reprodução automática
     * @description Define se o vídeo deve iniciar automaticamente ao ser carregado.
     * @default false
     */
    autoplay?: boolean;

    /**
     * @title Iframe Props
     * @hide
     */
    iframeProps?: preact.JSX.IntrinsicElements[
    "iframe"
    ];
  }

  /**
* @title Configurações do slider
* @description Define os parâmetros de exibição e comportamento do slider.
*/
  configs?: ISliderConfigs;
}

export default function ProductMediaBannerSection(
  {
    image,
    video,
    section,
    products,
    configs,
    isVideo = false,
    reverse = false,
  }: ProductMediaBannerSectionProps,
) {
  const id = useId();

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

  return (
    <Section
      {...section}
      id={id}
    >
      <div class="productMediaSideBySideContainer flex justify-center items-center gap-2.5 w-full">
        <div class="productMediaSideBySideProductContainer">
          {products.length ? <ProductShelf products={minimalProducts} configs={configs} rootId={id} /> : null}
        </div>
        <div class="productMediaSideBySideMediaContainer">
          {isVideo ? (video.src ? <iframe {...video}></iframe> : null) : (image.src.mobile.length || image.src.desktop.length ? <ResponsiveImage {...image} /> : null)}
        </div>
      </div>
      <style>
        {`
          .productMediaSideBySideContainer {
            flex-direction: ${reverse ? `column-reverse` : `column`};
          }

          @media screen and (min-width:1024px) {
            .productMediaSideBySideContainer {
              flex-direction: ${reverse ? `row-reverse` : `row`};
            }
          }
        `}
      </style>
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
