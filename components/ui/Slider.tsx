import { Slider } from "@eluxlab/library-components";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { createElement } from "preact";
import { Pagination } from "apps/workflows/deps.ts";

export type Props = {
  slides: createElement.JSX.Element[] | [];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function SwiperSlider({
  configs = {},
  slides = []
}: Props): preact.JSX.Element {  
  const {
    slidesPerView,
    slidesPerViewResponsive,
    loop,
    pagination,
    navigation,
    breakpoints = {},
    autoplay,
    spaceBetween,
    centeredSlides,
    lazy
  } = configs ?? {};

  // Fix loop mode warning
  const hasLoop =
    (loop &&
      typeof slidesPerView === "number" &&
      slides.length > slidesPerView) ??
    false;

  const validBreakpoints = Object.fromEntries(
    Object.entries(breakpoints).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  const autoplayConfig = autoplay?.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const mappedConfigs: ISliderConfigs = {
    lazy,
    centeredSlides,
    autoplay: autoplayConfig,
    spaceBetween: spaceBetween ?? 8,
    slidesPerView: slidesPerView ?? slidesPerViewResponsive?.mobile ?? 1,
    loop: hasLoop,
    customPagination: pagination,
    customNavigation: navigation,
    breakpoints: validBreakpoints
  };

  if (slides?.length === 1) {
    return slides?.[0];
  }

  return <Slider slides={slides} configs={mappedConfigs} />;
}
