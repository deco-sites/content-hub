import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ProductShelf from "site/islands/ProductShelf.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { useId } from "site/sdk/useId.ts";

/**
 * @description Componente de seção contendo um slider de produtos.
 */
interface ShelfSectionProps {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

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

export default function ShelfSection({ section, configs, products, }: ShelfSectionProps) {
  const id = useId();
  const hasProducts = !!products
    ?.length;

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

  return (
    <Section
      {...section}
      id={id}
      classesContainer="product-shelf-section mx-auto"
    >
      <div
        class={`flex flex-col items-center justify-center relative w-full`}
      >
        <div
          class={`flex w-full items-center justify-center`}
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
