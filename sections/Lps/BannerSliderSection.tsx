import BannerSlider from "site/islands/BannerSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

/**
 * @description Seção com um slider de banners.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Banners
   */
  banners?: IResponsiveImage[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;
}

export default function BannerSliderSection({
  section,
  banners,
  configs
}: Props) {
  const id = useId();
  const { fullWidth = true } = section ?? {};

  if (!banners?.length) return null;

  const { pagination, slidesPerViewResponsive } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive?.mobile ?? 1,
    pagination: {
      enabled: pagination?.enabledMobile
    },
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive?.tablet ?? 1
      },
      1024: {
        slidesPerView: slidesPerViewResponsive?.desktop ?? 1,
        pagination: {
          enabled: pagination?.enabledDesktop
        }
      }
    }
  } as ISliderConfigs;

  const defaultPropsBanners = banners.map(banner => {
    return {
      ...{ ...banner },
      sizes: {
        ...banner.sizes,
        fullScreen: true,
        maxHeight: 420,
        heightMobile: 400,
        widthMobile: 375
      }
    };
  });

  return (
    <Section
      {...section}
      id={id}
      fullWidth={fullWidth}
      classesContainer="banner-slider-section"
    >
      <BannerSlider
        configs={sliderConfig}
        rootId={id}
        banners={defaultPropsBanners}
      />
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "500px" }}
      class="flex justify-center items-center h-[420px] lg:h-[440px]"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
