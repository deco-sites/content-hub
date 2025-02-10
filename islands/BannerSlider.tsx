import Image from "apps/website/components/Image.tsx";
import Component from "site/components/ui/Slider.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

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

type Props = {
  banners?: IBannerSlide[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const slide = ({ srcMobile, alt, srcDesktop }: IBannerSlide) => {
    return (
      <picture class="flex w-screen">
        <source srcSet={srcMobile} media="(max-width: 1024px)" />
        <Image
          alt={alt}
          class="w-full"
          height={440}
          src={srcDesktop}
          width={1920}
        />
      </picture>
    );
  };

  const slides = banners.map(({ srcMobile, srcDesktop, alt, link }, idx) => {
    if (!link) {
      return (
        <div key={`${alt}-${idx}`}>
          {slide({ srcDesktop, srcMobile, alt, link })}
        </div>
      );
    }

    const { href, title } = link;

    return (
      <a href={href} title={title} key={`${alt}-${idx}`}>
        {slide({ srcDesktop, srcMobile, alt, link })}
      </a>
    );
  });

  return <Component configs={configs} slides={slides} rootId={rootId} />;
}

export default Island;
