import Slider from "site/components/ui/Slider.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import SummaryProductCard from "site/components/product/SummaryProductCard.tsx";
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
    ambassadors,
    configs = {},
    rootId,
  }: AmbassadorSliderProps,
) {
  const slides = ambassadors.length ? ambassadors.map(
    (ambassador, index) => {
      return (
        <div key={index} class="">
          <ResponsiveImage
            {...ambassador.photo}
          />
          {ambassador.products.length &&
            <SummaryProductCard
              {...ambassador.products[0]}
            />
          }
        </div>
      );
    },
  ) : [];

  return (
    <Slider
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}