/**
 * @title {{#alt}}{{alt}}{{/alt}}{{^alt}}Banner{{/alt}}
 */
export interface IBannerSlide {
  /**
   * @title Imagem (desktop)
   * @format image-uri
   */
  srcDesktop: string;

  /**
   * @title Imagem (mobile)
   * @format image-uri
   */
  srcMobile: string;

  /**
   * @title Alt
   * @description Atributo de texto alternativo (SEO)
   */
  alt: string;

  /**
   * @title Link
   * @description Objeto contendo informações do link do banner.
   */
  link?: {
    /**
     * @title URL do Link
     * @description Endereço para onde o link deve redirecionar.
     */
    href: string;

    /**
     * @title Título do Link
     * @description Texto adicional exibido ao passar o mouse sobre o banner (atributo title).
     */
    title: string;
  };
}
