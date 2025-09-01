import type { IInfoCard, IInfoCardImage, IInfoCardVideo } from "./InfoCard.d.ts";
import { TextArea } from "apps/admin/widgets.ts";

/**
 * @title {{#title}}{{title}}{{/title}}{{^title}}InfoCard{{/title}}
 */
export interface IInfoCardCustom extends Pick<IInfoCard, 'link' | 'typeOfContent' | 'direction'> {
  /**
   * @title Título
   */
  title?: string;

  /**
   * @title Descrição
   * @widget text-area
   * @description Texto descritivo.
  */
 description?: TextArea;

 /**
  * @title Cor de fundo do texto
  * @format color-input
  */
 textBackgroundColor?: string;
 
 /**
  * @title Fonte do texto
  * @description Ex: Arial, Gotham, Roboto
  * @default Arial
  * @options Arial, Gotham, Roboto, Helvetica, Sans-serif
  */
 fontFamily?: string;

  /**
   * @title Tipo de Conteúdo
   * @description Define se o cartão exibe uma imagem ou um vídeo.
   */
  typeOfContent?:
    | IInfoCardImage
    | IInfoCardVideo;

    /**
   * @title Alinhamento do Conteúdo
   * @description Define o alinhamento do conteúdo. (Default: left)
   */
  direction?: "left" | "right";
}
