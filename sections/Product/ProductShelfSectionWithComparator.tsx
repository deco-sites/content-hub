import ProductShelf from "site/islands/ProductShelf.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { Product } from "apps/commerce/types.ts";
import type { ProductSpecsComparator } from "site/types/Product.d.ts";

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
   * @title Lista de Produtos
   * @description Conjunto de produtos a serem exibidos dentro do slider.
   */
  products?: Product[] | null;

  /**
   * @title Especificações para Comparação de Produtos
   * @description Lista de atributos usados para comparar produtos no slider.
   */
  productSpecsComparator?: ProductSpecsComparator[];

  /**
   * @title Configurações do Slider
   * @description Define os parâmetros de exibição e comportamento do slider.
   */
  configs?: ISliderConfigs;
}

export default function ProductShelfSectionWithComparator({
  configs,
  section,
  products,
  productSpecsComparator
}: Props): preact.JSX.Element {
  const id = useId();
  const hasProducts = !!products?.length;

  const minimalProducts = products?.map(
    ({ url, isVariantOf, offers, image }) => {
      return {
        url,
        isVariantOf,
        offers,
        image,
        productSpecsComparator
      };
    }
  );

  const sliderConfig: ISliderConfigs = {
    ...configs,
    slidesPerView: 1.5,
    spaceBetween: 8,
    pagination: {
      enabled: configs?.pagination?.enabledMobile
    },
    navigation: {
      enabled: configs?.navigation?.enabledMobile
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        navigation: {
          enabled: true
        }
      },
      1024: {
        slidesPerView: 2,
        navigation: {
          enabled: true
        }
      },
      1280: {
        slidesPerView: 3,
        navigation: {
          enabled: true
        }
      },
      1440: {
        slidesPerView: 5,
        navigation: {
          enabled: true
        }
      }
    }
  } as ISliderConfigs;

  return (
    <Section {...section} id={id} classesContainer="pr-0 md:pr-4">
      <div class="flex w-full">
        {hasProducts && (
          <ProductShelf
            rootId={id}
            configs={sliderConfig}
            products={minimalProducts}
          />
        )}
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
