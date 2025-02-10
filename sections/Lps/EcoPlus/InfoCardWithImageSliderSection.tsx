import InfoCardWithImageSlider from "site/islands/InfoCardWithImageSlider.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { IInfoCardWithImage } from "site/types/InfoCardWithImage.d.ts";
import Section from "site/components/ui/Section.tsx";

/**
 * @description Seção com um slider de info cards.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

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
  section,
  infoCards,
  configs = {}
}: Props) {
  const rootId = useId();

  if (!infoCards?.length) return <></>;

  const { autoplay = {}, slidesPerView = 1, spaceBetween = 10 } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const breakpoints = {
    1024: {
      slidesPerView: 3
    }
  };

  return (
    <Section {...section}>
      <div class="flex w-full mx-auto px-[10px] info-card-with-image-slider">
        <InfoCardWithImageSlider
          configs={{
            ...configs,
            slidesPerView,
            spaceBetween,
            autoplay: autoplayConfig,
            breakpoints
          }}
          rootId={rootId}
          infoCards={infoCards}
        />
      </div>
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
