import { Slider } from "http://127.0.0.1:5500/dist/index.js";
import { ISliderConfigs } from "site/types/Slider.d.ts";

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
