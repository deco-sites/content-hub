import type { Product } from "apps/commerce/types.ts";
import type { IResponsiveImage } from "./ResponsiveImage.d.ts";
import type { ProductWithComparator } from "site/types/Product.d.ts";

/**
* @title Embaixador
*/
export interface IAmbassador {
  /**
  * @title Nome
  */
  name: string;
  /**
  * @title Descrição
  */
  description?: string;
  /**
  * @title Foto
  */
  image?: IResponsiveImage;
}

/**
* @title Embaixador com Produto
*/
export interface AmbassadorWithProduct {
  /**
  * @title Foto do embaixador
  */
  photo: IResponsiveImage;
  /**
  * @title Produto do embaixador
  */
  products: Product[] | null;
}