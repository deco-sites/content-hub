import type { IResponsiveImage } from "../ResponsiveImage.d.ts";
import type { Product } from "apps/commerce/types.ts";

export interface IAmbassador {
    /**
    * @title Nome do Embaixador
    */
    name: string;
    /**
    * @title Descrição do Embaixador
    */
    description?: string;
    /**
    * @title Fotos do Embaixador
    */
    image?: IResponsiveImage;
    /**
    * @title Produto do Embaixador
    */
    product?: Product;
}