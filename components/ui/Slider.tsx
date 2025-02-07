import { Slider } from "@eluxlab/library-components";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

export type SwiperSliderProps = {
  slides: React.JSX.Element[] | [];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function SwiperSlider({
  configs,
  slides = []
}: SwiperSliderProps) {
  return <Slider slides={slides} configs={configs} />;
}
