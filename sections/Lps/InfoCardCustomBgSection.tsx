import CustomInfoCardSlider from "site/islands/CustomInfoCardSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

/**
 * @title InfoCard com Background Personalizável
 * @description Seção com controle total de layout e fonte do InfoCard.
 */
interface Props {
  section?: ISection;
  infoCards?: IInfoCardCustom[];
  configs?: ISliderConfigs;
}

export default function InfoCardCustomBgSection({
  section,
  infoCards,
  configs,
}: Props) {
  const id = useId();

  if (!infoCards?.length) return null;

  return (
    <Section {...section} id={id} classesContainer="w-full max-w-none px-0">
      <CustomInfoCardSlider
        rootId={id}
        infoCards={infoCards}
        configs={configs}
      />
    </Section>
  );
}
