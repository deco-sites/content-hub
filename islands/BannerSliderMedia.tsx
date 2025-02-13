import Component from "site/components/ui/Slider.tsx";
import BannerMedia from "site/components/ui/BannerMedia.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IBannerSlide } from "site/types/Banner.d.ts";

type Props = {
  banners?: IBannerSlide[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const slides = banners.map((props, idx) => {
    return <BannerMedia {...props} key={`${props.alt}-${idx}`} />;
  });

  return <Component configs={configs} slides={slides} rootId={rootId} />;
}

export default Island;
