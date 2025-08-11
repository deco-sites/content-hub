import type { IInfoCard } from "./InfoCard.d.ts";

/**
 * @title InfoCard (Customizado)
 */
export interface IInfoCardCustom extends IInfoCard {
  /**
   * @title Título
   * @format rich-text
   * @description Suporta quebra de linha usando Enter ou \n
   */
  title?: string;

  /**
   * @title Descrição
   * @format rich-text
   * @description Texto descritivo com suporte a quebra de linha (\\n), usado apenas no componente custom.
   */
  description?: string;

  /**
   * @title Fonte do texto
   * @description Ex: Arial, Gotham, Roboto
   * @default Arial
   * @options Arial, Gotham, Roboto, Helvetica, Sans-serif
   */
  fontFamily?: string;

  /**
   * @title Cor de fundo do texto
   * @format color-input
   */
  textBackgroundColor?: string;

  /**
   * @title Cor do texto
   * @format color-input
   */
  textColor?: string;
}
