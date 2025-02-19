export interface ISection {
  /**
   * @title Título da Seção
   * @description Texto principal da seção.
   * @format rich-text
   */
  title?: string;

  /**
   * @title Margem Inferior (desktop)
   * @description Espaçamento inferior da seção, em pixels.
   * @default 40
   */
  marginDesktop?: number;

  /**
   * @title Margem Inferior (mobile)
   * @description Espaçamento inferior da seção, em pixels.
   * @default 16
   */
  marginMobile?: number;

  /**
   * @title Children
   * @hide
   */
  children?: preact.createElement.JSX.Element;

  /**
   * @title Container classes
   * @hide
   */
  classesContainer?: string;

  /**
   * @title Container styles
   * @hide
   */
  stylesContainer?: preact.JSX.AllCSSProperties;
}
