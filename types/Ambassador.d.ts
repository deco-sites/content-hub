import type { ImageWidget } from "apps/admin/widgets.ts";

export interface IAmbassador {
    /**
    * @title Nome do Embaixador
    */
    name: string;
    /**
    * @title Descrição do Embaixador
    */
    description: string;
    /**
    * @title Imagem Desktop
    */
    imageDesktop: ImageWidget;
    /**
    * @title Imagem Mobile
    */
    imageMobile: ImageWidget;
}
