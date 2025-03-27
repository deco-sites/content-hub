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
   * @hide
   * @default false
   */
  enabled?: boolean;

  /**
   * @title Ativar Paginação (mobile)
   * @description Habilita ou desabilita a paginação no slider.
   * @default false
   */
  enabledMobile?: boolean;

  /**
   * @title Ativar Paginação (desktop)
   * @description Habilita ou desabilita a paginação no slider.
   * @default false
   */
  enabledDesktop?: boolean;

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

  /**
   * @title Página Clicável
   * @description Permite que os usuários cliquem nos indicadores de paginação para navegar entre os slides.
   * @hide
   * @default true
   */
  clickable?: boolean;
}

interface Navigation {
  /**
   * @title Ativar Navegação (desktop)
   * @description Habilita ou desabilita a navegação no slider.
   * @hide
   * @default false
   */
  enabled?: boolean;

  /**
   * @title Ativar Navegação (mobile)
   * @description Habilita ou desabilita a navegação no slider.
   * @default false
   */
  enabledMobile?: boolean;

  /**
   * @title Ativar Navegação (desktop)
   * @description Habilita ou desabilita a navegação no slider.
   * @default false
   */
  enabledDesktop?: boolean;
}

interface SlidesPerView {
  /**
   * @title Mobile
   * @description até 768px.
   * @default 1
   */
  mobile?: number;

  /**
   * @title Tablet
   * @description até 1024px.
   * @default 1
   */
  tablet?: number;

  /**
   * @title Desktop
   * @description acima de 1024px.
   * @default 3
   */
  desktop?: number;
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
   * @title Slides visíveis por vez
   * @description Define quantos slides serão exibidos simultaneamente quando não houver breakpoints específicos.
   */
  slidesPerViewResponsive?: SlidesPerView;

  /**
   * @title Slides visíveis
   * @hide
   */
  slidesPerView?: number;

  /**
   * @title Exibir Navegação
   * @description Habilita botões de navegação (próximo e anterior) no slider.
   */
  customNavigation?: Navigation;

  /**
   * @title Paginação
   * @description Adiciona indicadores de paginação ao slider, como bullets ou números.
   */
  customPagination?: Pagination;

  /**
   * @title Autoplay
   * @description Configurações para reprodução automática do slider.
   */
  autoplay?: Partial<Autoplay>;

  /**
   * @title Velocidade da transição
   * @description Define a duração da animação ao trocar de slide, em milissegundos.
   * @default 300
   */
  speed?: number;

  /**
   * @title Espaçamento entre slides
   * @description Define o espaçamento em pixels entre os slides.
   * @default 0
   */
  spaceBetween?: number;

  /**
   * @title Breakpoints
   * @hide
   */
  breakpoints?: {
    [width: number]: ISliderConfigs;
    [ratio: string]: ISliderConfigs;
  };
}
