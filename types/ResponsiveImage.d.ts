interface ISize {
  /**
   * @title Full Screen
   * @description Default: false
   * @hide
   */
  fullScreen?: boolean;

  /**
   * @title Max Width Image
   * @description Default: "unset"
   * @hide
   */
  maxWidth?: number | string;

  /**
   * @title Max Height Image
   * @description Default: "unset"
   * @hide
   */
  maxHeight?: number | string;

  /**
   * @title Width Image
   * @description Default: 1920
   * @hide
   */
  width?: number;

  /**
   * @title Height Image
   * @description Default: 440
   * @hide
   */
  height?: number;

  /**
   * @title Width Image (Mobile)
   * @description Default: 420
   * @hide
   */
  widthMobile?: number;

  /**
   * @title Height Image (Mobile)
   * @description Default: 420
   * @hide
   */
  heightMobile?: number;
}

interface IImageSource {
  /**
   * @title Desktop
   * @format image-uri
   */
  desktop?: string;

  /**
   * @title Mobile
   * @format image-uri
   */
  mobile?: string;
}

interface ILoadingOptions {
  /**
   * @title Pré-carregamento de Imagem
   * @description Define se a imagem deve ser carregada antecipadamente para melhorar o tempo de exibição. Default: false
   */
  preload?: boolean;

  /**
   * @title Estratégia de Carregamento
   * @description Define se a imagem será carregada de forma preguiçosa (lazy) ou imediatamente (eager). Default: "lazy"
   */
  loading?: "lazy" | "eager";

  /**
   * @title Prioridade de Busca
   * @description Define a prioridade de carregamento da imagem para otimizar o desempenho da página. Default: "low"
   */
  fetchPriority?: "high" | "low";
}

/**
 * @title {{#alt}}{{alt}}{{/alt}}{{^alt}}Imagem{{/alt}}
 */
export interface IResponsiveImage {
  /**
   * @title Alt
   * @description Atributo de texto alternativo (SEO)
   */
  alt?: string;

  /**
   * @title URLs das Imagens
   * @description Objeto contendo as URLs das imagens para desktop e mobile.
   */
  src?: IImageSource;

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

    /**
     * @title Nova Aba?
     */
    target?: "blank" | "self";
  };

  /**
   * @title Tamanho da Imagem
   * @hide
   */
  sizes?: ISize;

  /**
   * @title Opções de Carregamento
   * @description Configurações para controle do carregamento da imagem.
   */
  loadingOptions?: ILoadingOptions;
}
