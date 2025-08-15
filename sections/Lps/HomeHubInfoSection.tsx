import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import CustomInfoCardSlider from "site/islands/CustomInfoCardSlider.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";

/**
 * @title Slider de Artigos/Blocos
 * @description Slider de blocos (imagem + texto) semelhante ao InfoCard.
 */
export interface Props {
  section?: ISection;
  infoCards?: IInfoCardCustom[];
  configs?: ISliderConfigs;
}

export default function HomeHubInfoSection({
  section,
  infoCards = [],
  configs,
}: Props) {
  const id = useId();

  if (!infoCards.length) return null;

  const sliderDefaults: ISliderConfigs = {
    loop: true,
    speed: 300,
    spaceBetween: 32,
    slidesPerView: 1,
    slidesPerViewResponsive: { mobile: 1, tablet: 1, desktop: 1 },
    customNavigation: { enabledDesktop: true, enabledMobile: false },
    customPagination: {
      enabledDesktop: true,
      enabledMobile: true,
      clickable: true,
    },
    autoplay: { enabled: false, delay: 5000 },
    ...(configs || {}),
  };


  return (
    <Section
      {...section}
      id={id}
      classesContainer="home-hub-section w-full max-w-none px-0"
    >
      {/* Slider */}
      <div class="w-full overflow-hidden">
        <CustomInfoCardSlider
          rootId={id}
          infoCards={infoCards}
          configs={sliderDefaults}
        />
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[420px] lg:h-[460px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
