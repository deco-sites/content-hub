import ProductShelf from "site/islands/ProductShelf.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { ProductSpecsComparator } from "site/types/Product.d.ts";
import type {
  ProductById,
  NullReturn
} from "site/loaders/customVTEX/productById.ts";

/**
 * @title {{#product}}ID: {{productId}}{{/product}}{{^product}}Product{{/product}}
 */
interface Products {
  /**
   * @title Produto
   * @description Informações detalhadas do produto a ser exibido, incluindo nome, preço e imagem.
   */
  product?: ProductById | NullReturn;

  /**
   * @title Atributos para Comparação
   * @description Lista de especificações utilizadas para comparar os produtos.
   */
  specs: ProductSpecsComparator[];
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
   * @title Produtos para Exibição
   * @description Lista de produtos que serão renderizados no slider da seção.
   */
  products?: Products[];

  /**
   * @title Configurações do Slider
   * @description Define os parâmetros de exibição e comportamento do slider.
   */
  configs?: ISliderConfigs;
}

export default function ProductShelfWithComparatorSection({
  configs,
  section,
  products
}: Props): preact.JSX.Element {
  const id = useId();

  const hasProducts = !!products?.length;

  const minimalProducts = products?.map(({ product, specs }) => {
    const { url, isVariantOf, offers, image } = product ?? {};

    return {
      url,
      isVariantOf,
      offers,
      image,
      productSpecsComparator: specs
    };
  });

  const sliderConfig: ISliderConfigs = {
    ...configs,
    slidesPerView: 1.5,
    spaceBetween: 8,
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      },
      1440: {
        slidesPerView: 5
      }
    }
  } as ISliderConfigs;

  return (
    <Section
      {...section}
      id={id}
      classesContainer="product-shelf-with-comparator-section pr-0 md:pr-4"
    >
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
