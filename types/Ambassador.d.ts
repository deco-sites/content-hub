import type { Product } from "apps/commerce/types.ts";
import type {IResponsiveImage} from "./ResponsiveImage.d.ts";

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
  /**
  * @title Produto
  */
    product?: Partial<Product>;
}