export interface ISection {
  /**
   * @title Título da Seção
   * @description Texto principal da seção.
   */
  title?: string;

  /**
   * @title Subtítulo da Seção
   * @description Texto secundário da seção.
   */
  subtitle?: string;

  /**
   * @title Margem Superior (desktop). Default: 0
   * @description Espaçamento superior da seção, em pixels.
   * @default 0
   */
  marginTopDesktop?: number;

  /**
   * @title Margem Superior (mobile). Default: 0
   * @description Espaçamento superior da seção, em pixels.
   * @default 0
   */
  marginTopMobile?: number;

  /**
   * @title Margem Inferior (desktop). Default: 52
   * @description Espaçamento inferior da seção, em pixels.
   * @default 52
   */
  marginBottomDesktop?: number;

  /**
   * @title Margem Inferior (mobile). Default: 32
   * @description Espaçamento inferior da seção, em pixels.
   * @default 32
   */
  marginBottomMobile?: number;

  /**
   * @title Ocupar Toda a Largura?
   * @description Define se o componente deve ocupar toda a largura disponível.
   * @default false
   */
  fullWidth?: boolean;

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
