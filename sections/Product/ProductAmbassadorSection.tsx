import { useId } from "site/sdk/useId.ts";
import AmbassadorSlider from "site/islands/AmbassadorSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { AmbassadorWithProduct } from "site/types/Ambassador.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

interface ProductAmbassadorsSectionProps {
  section?: ISection;
  /**
  * @title Lista de embaixadores com produtos
  */
  configs?: ISliderConfigs;
  /**
  * @title Lista de embaixadores
  */
  ambassadors?: AmbassadorWithProduct[];
}

export default function ProductAmbassadorsSection(
  {
    section,
    ambassadors,
    configs
  }: ProductAmbassadorsSectionProps,
) {
  const id = useId();

  if (!ambassadors?.length) return null;

  const {
    slidesPerViewResponsive = {
      mobile: 1,
      tablet: 2,
      desktop: 4,
    },
    spaceBetween = 32,
    centeredSlides = true,
  } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive.mobile,
    spaceBetween,
    centeredSlides,
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive
          .tablet,
        spaceBetween: 32,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: slidesPerViewResponsive
          .desktop,
        spaceBetween: 32,
        centeredSlides: false,
      },
    },
  } as ISliderConfigs;

  return (
    <Section
      {...section}
      id={id}
    >
      <div class="w-full">
        <AmbassadorSlider
          rootId={id}
          configs={sliderConfig}
          ambassadors={ambassadors}
        />
      </div>
    </Section>
  );
}