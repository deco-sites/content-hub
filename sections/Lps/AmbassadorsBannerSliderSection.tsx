import BannerSlider from "site/islands/BannerSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultBannerSection } from "site/configs/BannerSliderSection.ts";

/**
 * @description Seção com um slider de banners.
 */
interface AmbassadorsBannerSliderSectionProps {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: Omit<ISection, "centralizeTitleAndSubtitle">;

  /**
   * @title Banners
   */
  banners?: IResponsiveImage[];

  /**
  * @title Produtos
  */
  productIds?: string[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;
}

const Styles = () => (
  <style>{`
    .ambassadors-banner-slider-section .section-title {
      font-weight: 400;
      padding: 0 12%;
      position: absolute;
    }

    .ambassadors-banner-slider-section .section-title,
    .ambassadors-banner-slider-section .section-title h1 {
      color: #fff;
      font-size: 48px;
      z-index: 2;
    }

    .ambassadors-banner-slider-section::before {
      background: linear-gradient(
        0deg,
        rgb(54 54 54 / 60%) 26.08%,
        rgb(105 105 105 / 30%) 40.63%,
        rgb(156 156 156 / 0%) 72.5%
      );
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    @media (min-width: 768px) {
      .ambassadors-banner-slider-section::before {
        background: linear-gradient(
          270deg,
          rgb(54 54 54 / 60%) 39.26%,
          rgb(105 105 105 / 30%) 61.17%,
          rgb(156 156 156 / 0%) 109.15%
        );
      }

      .ambassadors-banner-slider-section .section-title,
      .ambassadors-banner-slider-section .section-title h1 {
        font-size: 128px;
      }
    }
  `}</style>
);

export default function AmbassadorsBannerSliderSection({
  section,
  banners = DefaultBannerSection.banners,
  productIds,
  configs,
}: AmbassadorsBannerSliderSectionProps) {
  const id = useId();

  const { slidesPerViewResponsive } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive?.mobile ?? 1,
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive?.tablet ?? 1,
      },
      1024: {
        slidesPerView: slidesPerViewResponsive?.desktop ?? 1,
      },
    },
  } as ISliderConfigs;

  if (!banners?.length) return null;

  const defaultPropsBanners = banners.map((banner) => {
    return {
      ...{ ...banner },
      sizes: {
        ...banner.sizes,
        fullScreen: true,
        heightMobile: 400,
        widthMobile: 375,
      },
    };
  });

  return (
    <>
      <Styles />
      <Section
        {...section}
        id={id}
        classesContainer="ambassadors-banner-slider-section relative font-[Ephesis,cursive]"
      >
        <BannerSlider
          rootId={id}
          banners={defaultPropsBanners}
          productIds={productIds}
          configs={sliderConfig}
        />
      </Section>
    </>
  );
}
