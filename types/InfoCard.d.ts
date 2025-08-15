/**
 * @title Imagem
 */
export interface IInfoCardImage {
  /**
   * @title Imagem (desktop)
   * @description URL da imagem para dispositivos desktop.
   * @format image-uri
   */
  srcDesktop: string;

  /**
   * @title Imagem (mobile)
   * @description URL da imagem para dispositivos móveis.
   * @format image-uri
   */
  srcMobile: string;

  /**
   * @title Texto Alternativo
   * @description Texto descritivo para acessibilidade.
   */
  alt: string;
}

/**
 * @title Vídeo
 */
export interface IInfoCardVideo {
  /**
   * @title Fonte do Vídeo
   * @description URL do vídeo.
   * @format video-uri
   */
  src: string;

  /**
   * @title Titulo do Vídeo
   * @description Texto descritivo para acessibilidade.
   */
  title: string;

  /**
   * @title Reprodução Automática
   * @description Define se o vídeo deve iniciar automaticamente ao ser carregado. (Default: false)
   * @default false
   */
  autoplay?: boolean;

  /**
   * @title Iframe Props
   * @hide
   */
  iframeProps?: preact.JSX.IntrinsicElements[
    "iframe"
  ];
}

/**
 * @title {{#title}}{{title}}{{/title}}{{^title}}InfoCard{{/title}}
 */
export interface IInfoCard {
  /**
   * @title Título
   */
  titleCMS?: string;

  /**
   * @title Texto
   * @format rich-text
   */
  richText?: string;

  /**
   * @title Link
   * @description Link para onde o usuário sera redirecionado ao clicar no botão.
   */
  link?: {
    /**
     * @title Texto do Botão
     * @description Define o texto exibido dentro do botão de ação.
     */
    text?: string;

    /**
     * @title URL de Destino
     * @description Endereço para onde o usuário será redirecionado ao clicar no botão.
     */
    href?: string;

    /**
     * @title Cor do botão e do texto
     * @description Define a cor do botão e do texto.
     * @format color-input
     * @default #000000
     */
    color?: string;
  };

  /**
   * @title Tipo de Conteúdo
   * @description Define se o cartão exibe uma imagem ou um vídeo.
   */
  typeOfContent?:
    | IInfoCardImage
    | IInfoCardVideo;

  /**
   * @title Alinhamento do Conteúdo
   * @description Define o alinhamento do conteúdo. (Default: left)
   */
  direction?: "left" | "right";

  /**
   * @title Classes
   * @hide
   */
  classes?: {
    container?: string;
    children?: string;
    childrenTextContent?: string;
    button?: string;
  };

  /**
   * @title Classes
   * @hide
   */
  styles?: {
    container?: preact.JSX.AllCSSProperties;
    children?: preact.JSX.AllCSSProperties;
    button?: preact.JSX.AllCSSProperties;
  };

  /**
   * @title Button Children
   * @hide
   */
  buttonChildren?: preact.JSX.Element;

  /**
   * @title Aplica Classe para Todos os Elementos
   * @hide
   */
  applyClassToAllElements?: boolean;

  /**
   * @title Cor de fundo do bloco de texto
   * @description Ex: #323333
   */
  textBackgroundColor?: string;

  /**
   * @title Cor do texto
   * @description Ex: #ffffff
   */
  textColor?: string;
}
