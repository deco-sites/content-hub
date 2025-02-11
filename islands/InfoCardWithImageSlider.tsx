import Component from "site/components/ui/Slider.tsx";
import InfoCardWithImage from "site/components/ui/InfoCardWithImage.tsx";
import type { IInfoCardWithImage } from "site/types/InfoCardWithImage.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

type Props = {
  infoCards?: IInfoCardWithImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ infoCards = [], configs = {}, rootId }: Props) {
  const slides = infoCards.map((props, idx) => (
    <InfoCardWithImage key={`${props.image.alt}-${idx}`} {...props} />
  ));

  return <Component configs={{ ...configs }} slides={slides} rootId={rootId} />;
}

export default Island;
