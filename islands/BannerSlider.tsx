import Component from "site/components/ui/Slider.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

type Props = {
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island(
  {
    banners = [],
    configs = {},
    rootId,
  }: Props,
) {
  const slides = banners.map(
    (props, idx) => {
      return (
        <ResponsiveImage
          {...props}
          key={`${props.alt}-${idx}`}
        />
      );
    },
  );

  return (
    <Component
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}

export default Island;
