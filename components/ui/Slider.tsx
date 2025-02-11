import { Slider } from "http://127.0.0.1:5500/dist/index.js";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { createElement } from "preact";

export type SwiperSliderProps = {
  slides: createElement.JSX.Element[] | [];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function SwiperSlider({
  configs,
  slides = [],
}: SwiperSliderProps) {
  // Fix loop mode warning
  const hasLoop =
    (configs &&
      configs.loop &&
      typeof configs.slidesPerView === "number" &&
      slides.length > configs.slidesPerView) ??
    false;

  return <Slider slides={slides} configs={{ ...configs, loop: hasLoop }} />;
}
