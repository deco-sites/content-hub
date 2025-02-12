import Component from "site/components/ui/Slider.tsx";
import Banner from "site/components/ui/Banner.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IBannerSlide } from "site/types/Banner.d.ts";

type Props = {
  banners?: IBannerSlide[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const slides = banners.map((props, idx) => {
    return <Banner {...props} key={`${props.alt}-${idx}`} fullScreen />;
  });

  return <Component configs={configs} slides={slides} rootId={rootId} />;
}

export default Island;
