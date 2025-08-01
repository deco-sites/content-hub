import { useId } from "site/sdk/useId.ts";
import AmbassadorSlider from "site/islands/AmbassadorSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { Product } from "apps/commerce/types.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

interface ProductAmbassadorsSectionProps {
  section?: ISection;
  /**
   * @title Lista de embaixadores com produtos
   */
  ambassadors?: IAmbassador[];
  configs?: ISliderConfigs;
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

  // const defaultPropBanners = banners
  //   .map((banner) => {
  //     return {
  //       ...{ ...banner },
  //       sizes: {
  //         ...banner.sizes,
  //         width: 185,
  //         height: 324,
  //         widthMobile: 185,
  //         heightMobile: 324,
  //       },
  //     };
  //   });

  return (
    <Section
      {...section}
      id={id}
    // class="p-0 lg:px-4"
    >
      {/* <div class="flex flex-col w-full mx-auto gap-4 lg:gap-6">
        <div class="flex items-center justify-between flex-col-reverse gap-8 lg:flex-row">
          <div class="flex w-full lg:w-[unset] lg:max-w-[500px] xl:max-w-none"> */}
      {ambassadors.length &&
        <AmbassadorSlider
          configs={sliderConfig}
          rootId={id}
          ambassadors={ambassadors}
        />}
      {/* </div>
        </div>
      </div> */}
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[682px] lg:h-[200px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
