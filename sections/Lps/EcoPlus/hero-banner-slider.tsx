import BannerSlider, { type IBannerSlide } from "site/islands/BannerSlider.tsx";
import { useId } from "site/sdk/useId.ts";
import { ISliderConfigs } from "site/types/Slider.d.ts";

/**
 * @description Seção principal com um slider de banners.
 */
interface Props {
  /**
   * @title Banners
   */
  banners?: IBannerSlide[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;
}

export default function Hero({
  banners,
  configs = {}
}: Props): React.JSX.Element {
  const rootId = useId();

  if (!banners?.length) return <></>;

  const { autoplay = {}, slidesPerView = "auto" } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  return (
    <BannerSlider
      configs={{
        ...configs,
        slidesPerView,
        autoplay: autoplayConfig
      }}
      rootId={rootId}
      banners={banners}
    />
  );
}

export function LoadingFallback() {
  return (
    <div>
      <h2>loading...</h2>
    </div>
  );
}
