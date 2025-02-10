interface Autoplay {
  /**
   * @title Ativar Autoplay
   * @description Habilita ou desabilita a rotação automática dos slides.
   * @default false
   */
  enabled?: boolean;

  /**
   * @title Delay do Autoplay (ms)
   * @description Tempo de espera entre os slides quando o autoplay está ativado.
   */
  delay?: number;
}

interface Pagination {
  /**
   * @title Ativar Paginação
   * @description Habilita ou desabilita a paginação no slider.
   * @default false
   */
  enabled?: boolean;

  /**
   * @title Página Clicável
   * @description Permite que os usuários cliquem nos indicadores de paginação para navegar entre os slides.
   * @default false
   */
  clickable?: boolean;

  /**
   * @title Bullets Dinâmicos
   * @description Se ativado, os bullets da paginação serão reduzidos quando houver muitos slides, exibindo apenas alguns próximos ao ativo.
   * @default false
   */
  dynamicBullets?: boolean;

  /**
   * @title Bullets Visíveis
   * @description Define quantos bullets centrais serão visíveis ao usar bullets dinâmicos. O restante será reduzido para indicar a direção.
   * @default 1
   */
  dynamicMainBullets?: number;
}

export interface ISliderConfigs {
  /**
   * @title Loop Infinito
   * @description Determina se o slide deve reiniciar automaticamente ao atingir o final.
   * @default false
   */
  loop?: boolean;

  /**
   * @title Lazy Loading
   * @description Adiciona um pré-carregador lento ao slide, carregando imagens apenas quando necessário para melhorar o desempenho.
   * @default false
   */
  lazy?: boolean;

  /**
   * @title Centralizar Slides
   * @description Se ativado, o slide ativo será centralizado em vez de ficar sempre alinhado à esquerda.
   * @default false
   */
  centeredSlides?: boolean;

  /**
   * @title Exibir Navegação
   * @description Habilita botões de navegação (próximo e anterior) no slider.
   * @default false
   */
  navigation?: boolean;

  /**
   * @title Paginação
   * @description Adiciona indicadores de paginação ao slider, como bullets ou números.
   */
  pagination?: Pagination;

  /**
   * @title Autoplay
   * @description Configurações para reprodução automática do slider.
   */
  autoplay?: Partial<Autoplay>;

  /**
   * @title Espaçamento entre slides
   * @description Define a distância entre os slides, em pixels. Pode ser um número ou uma string com unidade.
   * @default 0
   */
  spaceBetween?: number;

  /**
   * @title Velocidade da transição
   * @description Define a duração da animação ao trocar de slide, em milissegundos.
   * @default 300
   */
  speed?: number;

  /**
   * @title Slides visíveis por vez
   * @hide
   */
  slidesPerView?: number | "auto";

  /**
   * @title Breakpoints
   * @hide
   */

  breakpoints?: {
    [width: number]: ISliderConfigs;
    [ratio: string]: ISliderConfigs;
  };

  /**
   * @description The beginning of the modifier CSS class that can be added to swiper container depending on different parameters
   * @default 'swiper-'
   * @hide
   */
  containerModifierClass?: string;

  /**
   * @description CSS class name of slide
   * @default 'swiper-slide'
   * @hide
   */
  slideClass?: string;

  /**
   * @description CSS class name of currently active slide
   * @default 'swiper-slide-active'
   * @hide
   */
  slideActiveClass?: string;

  /**
   * @description CSS class name of currently/partially visible slide
   * @default 'swiper-slide-visible'
   * @hide
   */
  slideVisibleClass?: string;

  /**
   * @description CSS class name of fully (when whole slide is in the viewport) visible slide
   * @default 'swiper-slide-fully-visible'
   * @hide
   */
  slideFullyVisibleClass?: string;

  /**
   * @description CSS class name of the blank slide added by the loop mode (when `loopAddBlankSlides` is enabled)
   * @default 'swiper-slide-blank'
   * @hide
   */
  slideBlankClass?: string;

  /**
   * @description CSS class name of slide which is right after currently active slide
   * @default 'swiper-slide-next'
   * @hide
   */
  slideNextClass?: string;

  /**
   * @description CSS class name of slide which is right before currently active slide
   * @default 'swiper-slide-prev'
   * @hide
   */
  slidePrevClass?: string;

  /**
   * @description CSS class name of slides' wrapper
   * @default 'swiper-wrapper'
   * @hide
   */
  wrapperClass?: string;

  /**
   * @description CSS class name of lazy preloader
   * @default 'swiper-lazy-preloader'
   * @hide
   */
  lazyPreloaderClass?: string;
}
