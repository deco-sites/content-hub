interface Link {
  /**
   * @title URL do Link
   * @description Endereço para onde o link deve redirecionar.
   */
  href: string;

  /**
   * @title Texto do Link
   * @description Texto visível do link.
   */
  text: string;

  /**
   * @title Título do Link
   * @description Texto adicional exibido ao passar o mouse sobre o link (atributo title).
   */
  title: string;
}

/**
 * @title {{#title}}{{title}}{{/title}}{{^title}}Info Card{{/title}}
 */
export interface IInfoCardWithImage {
  /**
   * @title Imagem
   * @description Imagem exibida no card.
   */
  image: {
    /**
     * @title URL da imagem
     * @description Endereço da imagem a ser exibida.
     * @format image-uri
     */
    src: string;

    /**
     * @title Texto Alternativo (Alt)
     * @description Atributo de texto alternativo (SEO)
     */
    alt: string;
  };

  /**
   * @title Título
   * @description Texto principal do card.
   */
  title: string;

  /**
   * @title Descrição
   * @description Texto complementar do card.
   */
  text: string;

  /**
   * @title Link
   * @description Objeto contendo informações do link do card.
   */
  link: Link;
}
