import { ProductVTEX } from "site/types/Product.d.ts";
import ProductShelf from "site/islands/ProductShelf.tsx";
import { ISection } from "site/types/Section.d.ts";
import Section from "site/components/ui/Section.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";

interface ProductMediaSectionProps {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Lista de Produtos
   * @description Conjunto de produtos a serem exibidos dentro do slider.
   */
  products?: ProductVTEX[] | null;

  /**
   * @title Largura Completa
   * @description Define se a seção ocupará a largura total da tela. Quando ativado, o conteúdo se estende por toda a largura disponível.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * @title Reversão de conteúdo
   * @description Define se o conteúdo da seção terá seu posicionamento invertido ou não.
   * @default false
   */
  reverse?: boolean;

  /**
   * @title Reversão de conteúdo
   * @description Define se o conteúdo da seção terá seu posicionamento invertido ou não.
   * @default false
   */
  image?: IResponsiveImage;
}

export default function ProductMediaSection(
  {
    section,
    products,
    image,
    video,
    fullWidth = false,
    reverse = false,
  }: ProductMediaSectionProps,
) {
  const id = useId();
  const hasProducts = !!products
    ?.length;
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
      classesContainer="product-shelf-section mx-auto"
      fullWidth={isCustomShelf}
    >
      <div
        class={`flex flex-col items-center justify-center relative w-full`}
      >
        <div
          class={`flex w-full top-0 left-0 absolute -z-[1] max-h-[475px] lg:[position:initial] lg:max-h-[initial] ${!reverse ? "justify-end" : "justify-start"
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

        <div
          class={`flex w-full items-center justify-center ${!reverse ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}
        >
          <div
            class={`flex w-full`}
          >
            {hasProducts && (
              <ProductShelf
                products={minimalProducts}
                rootId={id}
                configs={sliderConfig}
              />
            )}
          </div>
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
