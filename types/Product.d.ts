import type { Product } from "apps/commerce/types.ts";
import type {
  Item,
  PriceRange,
  SkuSpecification,
  SpecificationGroup,
} from "apps/vtex/utils/types.ts";

/**
 * @title {{#name}}{{name}}{{/name}}{{^name}}Especificação{{/name}}
 */
export interface ProductSpecsComparator {
  /**
   * @title Nome da Especificação
   * @description Nome especificação para comparação.
   */
  name: string;

  /**
   * @title Valor da Especificação
   * @description Valor especificação para comparação.
   */
  value: string;

  /**
   * @title O produto tem a especificação?
   * @default false
   */
  hasSpec?: boolean;

  /**
   * @title Ícone da Especificação
   * @format image-uri
   * @description URL da imagem representando a especificação do produto.
   */
  icon?: string;
}

export interface ProductWithComparator extends Product {
  productSpecsComparator?: ProductSpecsComparator[];
}

export interface ProductVTEX {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  cacheId: string;
  linkText: string;
  productReference: string;
  categoryId: string;
  clusterHighlights: { id: string; name: string }[];
  productClusters: { id: string; name: string }[];
  categories: string[];
  link: string;
  description: string;
  skuSpecifications?: SkuSpecification[];
  priceRange: PriceRange;
  specificationGroups: SpecificationGroup[];
  properties: Array<{ name: string; values: string[] }>;
  selectedProperties: Array<{ key: string; value: string }>;
  releaseDate: string;
  items: Item[];
}
