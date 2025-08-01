import InfoCardSlider from "site/islands/InfoCardSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IInfoCard } from "site/types/InfoCard.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultInfoCardSection } from "site/configs/InfoCardSection.ts";

/**
 * @description Componente de seção contendo um cartão informativo.
 */
interface InfoCardSectionProps {
  section?: ISection;
  configs?: ISliderConfigs;
  /**
   * @title Cartões Informativos
   * @description Conjunto de cartões informativos a serem exibidos dentro do slider.
   */
  infoCards?: IInfoCard[];
}

export default function InfoCardSection(
  {
    section,
    infoCards = DefaultInfoCardSection.infoCards,
    configs,
  }: InfoCardSectionProps,
) {
  const id = useId();

  if (!infoCards?.length) return null;

  const { slidesPerViewResponsive } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive?.mobile ??
      1,
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive
          ?.tablet ?? 1,
      },
      1024: {
        slidesPerView: slidesPerViewResponsive
          ?.desktop ?? 1,
      },
    },
  }

  return (
    <Section
      {...section}
      id={id}
      classesContainer="info-card-section"
    >
      <InfoCardSlider
        rootId={id}
        configs={sliderConfig}
        infoCards={infoCards}
      />
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[570px] lg:h-[500px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
