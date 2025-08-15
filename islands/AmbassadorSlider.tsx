import Slider from "site/components/ui/Slider.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import SummaryProductCard from "site/components/product/SummaryProductCard.tsx";
import type { AmbassadorWithProduct } from "site/types/Ambassador.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

interface AmbassadorSliderProps {
  ambassadors: IAmbassador[];
  configs: ISliderConfigs;
  rootId: string;
}

export default function AmbassadorSlider(
  {
    ambassadors,
    configs = {},
    rootId,
  }: AmbassadorSliderProps,
) {
  const slides = ambassadors.length
    ? ambassadors.map(
      (ambassador, index) => {
        return (
          <div key={index} class="flex flex-col gap-y-[20px]">
            <ResponsiveImage
              {...ambassador.photo}
            />
            {ambassador.products.length &&
              (
                <SummaryProductCard
                  {...ambassador.products[0]}
                />
              )}
          </div>
        );
      },
    )
    : [];

  return (
    <Slider
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}
