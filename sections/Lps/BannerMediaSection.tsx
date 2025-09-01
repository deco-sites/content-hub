import BannerSlider from "site/islands/BannerSlider.tsx";
import Icon from "site/components/ui/Icon.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import { isEmptyText } from "site/utils/text.ts";
import type { AvailableIcons } from "site/components/ui/Icon.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultBannerMedia } from "site/configs/BannerMediaSection.ts";
import { TextArea } from "apps/admin/widgets.ts";

/**
 * @title {{#id}}{{id}}{{/id}}{{^id}}Ícone{{/id}}
 */
interface IconItem {
  id: AvailableIcons;
  href: string;
}

interface BannerMediaSliderSectionProps {
  section?: ISection;

  /**
   * @title Banners
   */
  banners?: IResponsiveImage[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;

  /**
   * @title Título
   */
  title?: string;

  /**
   * @title Texto
   * @widget text-area
   * @default Lorem
   */
  text: TextArea;

  /**
   * @title Lista de ícones para renderizar
   */
  icons?: IconItem[];
}

export default function BannerMediaSliderSection(
  {
    section,
    banners = DefaultBannerMedia.banners,
    title = DefaultBannerMedia.title,
    text,
    configs = DefaultBannerMedia.configs,
    icons = DefaultBannerMedia.icons,
  }: BannerMediaSliderSectionProps,
) {
  const id = useId();

  if (!banners?.length) return null;

  const {
    slidesPerViewResponsive = {
      mobile: 1,
      tablet: 1,
      desktop: 3,
    },
    spaceBetween = 24,
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
        spaceBetween: 24,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: slidesPerViewResponsive
          .desktop,
        spaceBetween: 24,
        centeredSlides: false,
      },
    },
  } as ISliderConfigs;

  const defaultPropBanners = banners
    .map((banner) => {
      return {
        ...{ ...banner },
        sizes: {
          ...banner.sizes,
          width: 185,
          height: 324,
          widthMobile: 185,
          heightMobile: 324,
        },
      };
    });

  return (
    <Section
      {...section}
      id={id}
    >
      <div class="flex flex-col items-center justify-center gap-8 my-[48px] lg:flex-row lg:justify-between">
        <div class="banner-media-slider-container w-full">
          <BannerSlider
            configs={sliderConfig}
            rootId={id}
            banners={defaultPropBanners}
          />
        </div>
        <div class="flex flex-col items-start justify-center gap-y-[20px] max-w-[343px] lg:w-[560px]">
          <div class="flex flex-col gap-y-[16px] text-left">
            {!isEmptyText(title) && <h2 class='text-[20px] text-[#011E41] font-semibold'>{title}</h2>}
            {!isEmptyText(text) && <p class='text-[#515253]'>{text}</p>}
          </div>
          <div class="w-full flex flex-wrap justify-start items-center gap-x-[24px]">
            {icons?.map((
              { id, href },
            ) => (
              <a
                target="_blank"
                key={id}
                title={id}
                href={href}
              >
                <Icon
                  id={id}
                  size={32}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>
        {` 
          .banner-media-slider-container .swiper-slide {
            max-width: 343px;
          }

          .banner-media-slider-container .swiper-slide a picture,
          .banner-media-slider-container .swiper-slide a img,
          .banner-media-slider-container .swiper-slide a source {
            object-fit: cover;
            border-radius: 4px;
          }
          
          @media screen and (min-width: 1280px) {
            .banner-media-slider-container .swiper-slide {
              height: auto !important;
            }

            .banner-media-slider-container .swiper-slide a {
              height: 100%;
            }
            
            .banner-media-slider-container {
              max-width: 600px;
            }
          }

          @media screen and (min-width: 1440px) {
            .banner-media-slider-container {
              max-width: 760px;
            }
          }

          @media screen and (min-width: 1920px) {
            .banner-media-slider-container {
              max-width: 1000px;
            }
          }
        `}
      </style>
    </Section>
  );
}