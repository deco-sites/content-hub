import type { Product } from "apps/commerce/types.ts";

/**
 * @title {{#name}}{{name}}{{/name}}{{^name}}Especificação{{/name}}
 */
export interface ProductSpecsComparator {
  /**
   * @title Ícone da Especificação
   * @format image-uri
   * @description URL da imagem representando a especificação do produto.
   */
  icon?: string;

  /**
   * @title Nome da Especificação
   * @description Nome exato da especificação do produto.
   */
  name: string;
}

export interface ProductWithComparator extends Product {
  productSpecsComparator?: ProductSpecsComparator[];
}
