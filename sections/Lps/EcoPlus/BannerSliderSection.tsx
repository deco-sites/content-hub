import BannerSlider from "site/islands/BannerSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IBannerSlide } from "site/types/Banner.d.ts";

/**
 * @description Seção com um slider de banners.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define título, subtítulo e espaçamento da seção.
   */
  section?: ISection;
  /**
   * @title Banners
   */
  banners?: IBannerSlide[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;
}

export default function BannerSliderSection({
  section,
  banners,
  configs = {}
}: Props) {
  const rootId = useId();

  if (!banners?.length) return <></>;

  const { autoplay = {}, slidesPerView = "auto" } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  return (
    <Section {...section}>
      <BannerSlider
        configs={{
          ...configs,
          slidesPerView,
          autoplay: autoplayConfig
        }}
        rootId={rootId}
        banners={banners}
      />
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <h2>loading...</h2>
    </div>
  );
}
