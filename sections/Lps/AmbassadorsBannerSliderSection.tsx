// sections/AmbassadorsBannerSliderSection.tsx
import BannerSlider from "site/islands/BannerSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";

import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultBannerSection } from "site/configs/BannerSliderSection.ts";

export interface IProductCard {
  image: IResponsiveImage;
  title?: string;
  href?: string;
}

interface Props {
  section?: Omit<ISection, "centralizeTitleAndSubtitle">;
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  products?: IProductCard[];
  showProductTitles?: boolean;
  maxWidthCardsPx?: number;
}

const Styles = () => (
  <style>{`
    .ambassadors-banner-slider-section .section-title,
    .ambassadors-banner-slider-section .section-title h1 {
      font-weight: 400;
      padding: 0 12%;
      position: absolute;
      z-index: 2;
      color: #fff;
      font-size: 48px !important;
      bottom: 12px;
      right: 45px;
    }

    @media (min-width: 768px) {
      .ambassadors-banner-slider-section .section-title,
      .ambassadors-banner-slider-section .section-title h1 {
        font-size: 128px !important; /* <-- desktop */
        top: 0;
        right: 20px;
      }
    }

    .ambassadors-banner-slider-section .banner-hero { position: relative; z-index: 1; }
    .ambassadors-banner-slider-section .banner-hero::before {
      content: '';
      position: absolute; inset: 0; z-index: 1;
      pointer-events: none;
      background: linear-gradient(
        0deg,
        rgb(54 54 54 / 60%) 26.08%,
        rgb(105 105 105 / 30%) 40.63%,
        rgb(156 156 156 / 0%) 72.5%
      );
    }
    @media (min-width: 768px) {
      .ambassadors-banner-slider-section .banner-hero::before {
        background: linear-gradient(
          270deg,
          rgb(54 54 54 / 60%) 39.26%,
          rgb(105 105 105 / 30%) 61.17%,
          rgb(156 156 156 / 0%) 109.15%
        );
      }
    }
  `}</style>
);

export default function AmbassadorsBannerSliderSection({
  section,
  banners = DefaultBannerSection.banners,
  configs,
  products = [],
  showProductTitles = true,
  maxWidthCardsPx = 1100,
}: Props) {
  const id = useId();
  if (!banners?.length) return null;

  // Slider com fallbacks seguros
  const { slidesPerViewResponsive } = configs ?? {};
  const sliderConfig: ISliderConfigs = {
    ...configs,
    slidesPerView: slidesPerViewResponsive?.mobile ?? 1,
    breakpoints: {
      768: { slidesPerView: slidesPerViewResponsive?.tablet ?? 1 },
      1024: { slidesPerView: slidesPerViewResponsive?.desktop ?? 1 },
    },
  };

  const normalizedBanners = banners.map((banner) => ({
    ...banner,
    sizes: {
      ...(banner.sizes ?? {}),
      fullScreen: true,
      heightMobile: 400,
      widthMobile: 375,
    },
  }));

  const visibleProducts = products.slice(0, 3);

  return (
    <>
      <Styles />
      <Section
        {...section}
        id={id}
        classesContainer="ambassadors-banner-slider-section relative font-[Ephesis,cursive] pb-[0px] md:pb-[60px]"
      >
        {/* Banner com overlay */}
        <div class="banner-hero">
          <BannerSlider configs={sliderConfig} rootId={id} banners={normalizedBanners} />

          {visibleProducts.length > 0 && (
            <div class="pointer-events-none absolute left-1/2 bottom-0 z-[2] w-full -translate-x-1/2 translate-y-1/2">
              <div
                class="mx-auto flex items-stretch justify-center gap-3 px-4 md:gap-6"
                style={{ maxWidth: `${maxWidthCardsPx}px` }}
              >
                {visibleProducts.map((item, idx) => {
                  const Tag = item.href ? "a" : "div";
                  return (
                    <Tag
                      key={idx}
                      href={item.href}
                      class="pointer-events-auto group block bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] w-[111px] h-[111px] md:w-[255px] md:h-[234px]"
                    >
                      <div class="flex h-full flex-col items-center justify-start p-2 md:p-4">
                        <div class="flex items-center justify-center w-[50px] h-[50px] md:w-[137px] md:h-[137px]">
                          {item?.image && (
                            <ResponsiveImage
                              {...item.image}
                              class="max-w-full max-h-full object-contain"
                            />
                          )}
                        </div>

                        {showProductTitles && item?.title && (
                          <span
                            style={{ fontFamily: "Electrolux Sans, sans-serif" }}
                            class="mt-1 block text-center text-[10px] font-semibold leading-[1.1] text-[#041E50] md:mt-3 md:text-[16px]"
                          >
                            {item.title}
                          </span>
                        )}
                      </div>
                    </Tag>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
