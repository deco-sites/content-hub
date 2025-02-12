import Component from "site/components/ui/Slider.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

type Props = {
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const slides = banners.map((props, idx) => {
    return (
      <ResponsiveImage {...props} key={`${props.alt}-${idx}`} fullScreen />
    );
  });

  return <Component configs={configs} slides={slides} rootId={rootId} />;
}

export default Island;
