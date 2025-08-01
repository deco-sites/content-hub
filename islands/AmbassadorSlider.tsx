import Slider from "site/components/ui/Slider.tsx";
import MiniProductCard from "site/components/product/MiniProductCard.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IAmbassador } from "site/types/Ambassador.d.ts";

interface AmbassadorSliderProps {
  ambassadors: IAmbassador[];
  configs: ISliderConfigs;
  rootId: string;
};

export default function AmbassadorSlider(
  {
    ambassadors = [],
    configs = {},
    rootId,
  }: AmbassadorSliderProps,
) {
  const slides = ambassadors.map(
    (ambassador, idx) => {
      return (
        <div key={`${ambassador.image.alt}-${idx}`}>
          <ResponsiveImage
            {...ambassador.image}
          />
          <MiniProductCard {...ambassador.product} />
        </div>
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
