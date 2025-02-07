import Component from "site/components/ui/Slider.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

/**
 * @title {{#alt}}{{alt}}{{/alt}}{{^alt}}Banner{{/alt}}
 */
export interface IBannerSlide {
  /**
   * @title Imagem
   * @format image-uri
   */
  src: string;

  /**
   * @title Alt
   * @description Atributo de texto alternativo (SEO)
   */
  alt: string;
}

type Props = {
  banners?: IBannerSlide[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const slides = banners.map(({ src, alt }, idx) => (
    <img key={`${alt}-${idx}`} src={src} alt={alt} />
  ));

  return <Component configs={configs} slides={slides} rootId={rootId} />;
}

export default Island;
