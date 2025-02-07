import InfoCardWithImageSlider from "site/islands/InfoCardWithImageSlider.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IInfoCardWithImage } from "site/types/InfoCardWithImage.d.ts";

/**
 * @description Seção com um slider de info cards.
 */
interface Props {
  /**
   * @title Info Cards
   */
  infoCards?: IInfoCardWithImage[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;
}

export default function InfoCardWithImageSliderSection({
  infoCards,
  configs = {}
}: Props): React.JSX.Element {
  const rootId = useId();

  if (!infoCards?.length) return <></>;

  const { autoplay = {}, slidesPerView = 3, spaceBetween = 10 } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  return (
    <div class="flex w-full mx-auto info-card-with-image-slider">
      <InfoCardWithImageSlider
        configs={{
          ...configs,
          slidesPerView,
          spaceBetween,
          autoplay: autoplayConfig
        }}
        rootId={rootId}
        infoCards={infoCards}
      />
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <h2>loading...</h2>
    </div>
  );
}
