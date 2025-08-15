/**
 * @title {{#title}}{{title}}{{/title}}{{^title}}Ícone{{/title}}
 */
export interface IInfoIcon {
  /**
   * @title Título
   * @description Título do ícone exibido ao usuário.
   */
  title?: string;

  /**
   * @title Texto alternativo
   * @description Texto descritivo para a imagem do ícone.
   */
  alt?: string;

  /**
   * @format image-uri
   * @title Fonte da imagem
   * @description URL da imagem do ícone.
   */
  imageSrc?: string;

  /**
   * @title Link de redirecionamento
   * @description URL para onde o usuário será redirecionado ao clicar no ícone.
   */
  redirect?: string;

  /**
   * @title Abrir em nova aba
   * @description Define se o link será aberto em uma nova aba.
   * @default false
   */
  target?: boolean;

  /**
   * @format color-input
   * @default #ffffff
   * @title Cor de fundo
   * @description Cor de fundo do ícone.
   */
  boxBackgroundColor?: string;

  /**
   * @format color-input
   * @default #617f57
   * @title Cor de fundo ao passar o mouse
   * @description Cor de fundo do ícone quando o mouse passa sobre ele.
   */
  boxBackgroundColorHover?: string;
}
