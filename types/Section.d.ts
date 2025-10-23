import { ComponentChildren, JSX } from "preact";

export interface ISection extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * @title Id da Seção
   * @description Para utilizar, é necessário importar "import { useId } from "site/sdk/useId.ts";" quando for criar uma nova section.
   * @hide
   */
  id: string;

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
   * @title Centralizar título e subtítulo?
   * @default false
   */
  centralizeTitleAndSubtitle?: boolean;

  /**
   * @title Utilizar margens laterais maiores para título e subtítulo?
   * @description Ideal para seções de texto (TextSection) e de imagem (ImageCollectionGridSection) em artigos. Esta opção só faz diferença em visualização desktop.
   * @default false
   */
  articlePaddingForTitleAndSubtitle?: boolean;

  /**
   * @title Utilizar margens laterais maiores para o conteúdo?
   * @description Esta opção só faz diferença em visualização desktop.
   * @default false
   */
  articlePaddingForContent?: boolean;

  /**
   * @title Mobile - Margem Superior.
   * @description Espaçamento superior da seção, em pixels.
   * @default 0
   */
  marginTopMobile?: number;

  /**
   * @title Mobile - Margem Inferior.
   * @description Espaçamento inferior da seção, em pixels.
   * @default 0
   */
  marginBottomMobile?: number;

  /**
   * @title Desktop - Margem Superior.
   * @description Espaçamento superior da seção, em pixels.
   * @default 0
   */
  marginTopDesktop?: number;

  /**
   * @title Desktop - Margem Inferior.
   * @description Espaçamento inferior da seção, em pixels.
   * @default 0
   */
  marginBottomDesktop?: number;

  /**
   * @title Ocupar toda a largura?
   * @description Define se o componente deve ocupar toda a largura disponível.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * @title Children
   * @hide
   */
  children?: ComponentChildren | null;

  /**
   * @title Container classes
   * @hide
   */
  classesContainer?: string;
}
