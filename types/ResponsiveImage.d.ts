/**
 * @title {{#alt}}{{alt}}{{/alt}}{{^alt}}Imagem{{/alt}}
 */
export interface IResponsiveImage {
  /**
   * @title Imagem (desktop)
   * @format image-uri
   */
  srcDesktop?: string;

  /**
   * @title Imagem (mobile)
   * @format image-uri
   */
  srcMobile?: string;

  /**
   * @title Alt
   * @description Atributo de texto alternativo (SEO)
   */
  alt?: string;

  /**
   * @title Link
   * @description Objeto contendo informações do link do banner.
   */
  link?: {
    /**
     * @title URL do Link
     * @description Endereço para onde o link deve redirecionar.
     */
    href?: string;

    /**
     * @title Título do Link
     * @description Texto adicional exibido ao passar o mouse sobre o banner (atributo title).
     */
    title?: string;
  };

  /**
   * @title Full Screen
   * @hide
   */
  fullScreen?: boolean;

  /**
   * @title Max Width Image
   * @hide
   */
  maxWidth?: number | string;

  /**
   * @title Max Height Image
   * @hide
   */
  maxHeight?: number | string;

  /**
   * @title Width Image
   * @hide
   */
  width?: number;

  /**
   * @title Height Image
   * @hide
   */
  height?: number;
}
