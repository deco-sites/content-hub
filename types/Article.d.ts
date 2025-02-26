import { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

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
 * @title {{#title}}{{title}}{{/title}}{{^title}}Artigo{{/title}}
 */
export interface IArticle {
  /**
   * @title Imagem
   * @description Imagem exibida no artigo.
   */
  image: IResponsiveImage;

  /**
   * @title Título
   * @description Texto principal do artigo.
   */
  title: string;

  /**
   * @title Descrição
   * @description Texto complementar do artigo.
   */
  text: string;

  /**
   * @title Link
   * @description Objeto contendo informações do link do artigo.
   */
  link: Link;
}
