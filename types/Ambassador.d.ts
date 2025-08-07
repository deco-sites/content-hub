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