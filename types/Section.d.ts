import { ComponentChildren } from "preact";
import { JSX } from "preact";

export interface ISection extends JSX.HTMLAttributes<HTMLDivElement> {
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
