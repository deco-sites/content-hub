import Slider from "site/components/ui/Slider.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

type BannerSliderProps = {
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function BannerSlider(
  {
    banners = [],
    configs = {},
    rootId,
  }: BannerSliderProps,
) {
  const slides = banners.map(
    (banner, idx) => {
      return (
        <ResponsiveImage
          {...banner}
          key={`${banner.alt}-${idx}`}
        />
      );
    },
  );

  return (
    <Slider
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}
