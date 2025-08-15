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
  slides = [],
  rootId,
}: Props): preact.JSX.Element {
  const {
    slidesPerView,
    slidesPerViewResponsive,
    loop,
    customPagination,
    customNavigation,
    breakpoints = {},
    autoplay,
    spaceBetween,
    centeredSlides,
    lazy,
  } = configs ?? {};

  const idRoot = rootId;

  // Fix loop mode warning
  const hasLoop = (loop &&
    typeof slidesPerView === "number" &&
    slides.length > slidesPerView) ??
    false;

  const validBreakpoints = Object
    .fromEntries(
      Object.entries(breakpoints)
        .filter(
          ([, value]) =>
            value !== undefined &&
            value !== null,
        ),
    );

  const autoplayConfig = autoplay?.enabled
    ? {
      delay: autoplay.delay ?? 3000,
    }
    : undefined;

  const mappedConfigs: ISliderConfigs = {
    lazy,
    centeredSlides,
    autoplay: autoplayConfig,
    spaceBetween: spaceBetween ?? 8,
    slidesPerView: slidesPerView ??
      slidesPerViewResponsive
        ?.mobile ??
      1,
    loop: hasLoop,
    customPagination,
    customNavigation,
    breakpoints: validBreakpoints,
  };

  if (slides?.length === 1) {
    return slides?.[0];
  }

  return (
    <Slider
      slides={slides}
      configs={mappedConfigs}
    />
  );
}
