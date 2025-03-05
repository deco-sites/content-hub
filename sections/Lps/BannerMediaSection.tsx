import BannerSlider from "site/islands/BannerSlider.tsx";
import Icon from "site/components/ui/Icon.tsx";
import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import { isEmptyText } from "site/utils/text.ts";
import type { AvailableIcons } from "site/components/ui/Icon.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultBannerMedia } from "site/configs/BannerMediaSection.ts";

/**
 * @title {{#id}}{{id}}{{/id}}{{^id}}Ícone{{/id}}
 */
interface IconItem {
  id: AvailableIcons;
  href: string;
}

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

  /**
   * @title Configurações dos textos ao lado
   * @format rich-text
   */
  title?: string;

  /**
   * @title Lista de ícones para renderizar
   */
  icons?: IconItem[];
}

export default function BannerMediaSliderSection({
  section,
  banners = DefaultBannerMedia.banners,
  title = DefaultBannerMedia.title,
  configs = DefaultBannerMedia.configs,
  icons = DefaultBannerMedia.icons
}: Props) {
  const id = useId();

  if (!banners?.length) return null;

  const {
    slidesPerViewResponsive = {
      mobile: 1.6,
      tablet: 2.3,
      desktop: 3
    },
    spaceBetween = 32,
    centeredSlides = true,
    pagination
  } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive.mobile,
    spaceBetween,
    centeredSlides,
    pagination: {
      enabled: pagination?.enabledMobile ?? false
    },
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive.tablet,
        spaceBetween: 32,
        centeredSlides: false
      },
      1024: {
        slidesPerView: slidesPerViewResponsive.desktop,
        spaceBetween: 32,
        centeredSlides: false,
        pagination: {
          enabled: pagination?.enabledDesktop ?? false
        }
      }
    }
  } as ISliderConfigs;

  const defaultPropBanners = banners.map(banner => {
    return {
      ...{ ...banner },
      sizes: {
        ...banner.sizes,
        width: 185,
        height: 324,
        widthMobile: 185,
        heightMobile: 324
      }
    };
  });

  return (
    <Section
      {...section}
      id={id}
      classesContainer="banner-media-section p-0 lg:px-4"
    >
      <div class="flex flex-col w-full mx-auto gap-4 lg:gap-6">
        <div class="flex items-center justify-between flex-col-reverse gap-8 lg:flex-row">
          <div class="flex w-full lg:w-[unset] lg:max-w-[500px] xl:max-w-none">
            <BannerSlider
              configs={sliderConfig}
              rootId={id}
              banners={defaultPropBanners}
            />
          </div>
          <div class="flex flex-col items-center justify-center max-w-[600px]">
            {!isEmptyText(title) && (
              <>
                <div class="flex text-center lg:text-left">
                  <Text title={title} />
                </div>
                <div class="w-full mt-4 flex flex-wrap justify-center items-center gap-x-[24px] lg:justify-start">
                  {icons?.map(({ id, href }) => (
                    <a target="_blank" key={id} title={id} href={href}>
                      <Icon id={id} size={32} />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
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
