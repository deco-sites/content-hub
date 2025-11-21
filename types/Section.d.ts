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
   * @title Alinhamento do título e subtítulo
   * @description Define o alinhamento do título e subtítulo da seção.
   * @default "left"
   */
  titleAlignment?: {
    desktop?: "left" | "center" | "right";
    mobile?: "left" | "center" | "right";
  };

  /**
   * @title Centralizar título e subtítulo?
   * @default false
   * @description Define se o título e subtítulo devem ser centralizados.
   */
  centralizeTitleAndSubtitle?: boolean;

  /**
   * @title Utilizar margens laterais menores para título e subtítulo?
   * @description Ideal para seções de texto (TextSection) e de imagem (ImageCollectionGridSection) em artigos. Esta opção só faz diferença em visualização desktop.
   * @default true
   */
  articlePaddingForTitleAndSubtitle?: boolean;

  /**
   * @title Utilizar margens laterais menores para o conteúdo?
   * @description Esta opção só faz diferença em visualização desktop.
   * @default true
   */
  articlePaddingForContent?: boolean;

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
