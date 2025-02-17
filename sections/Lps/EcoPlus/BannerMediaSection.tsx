import BannerSlider from "site/islands/BannerSlider.tsx";
import Icon from "site/components/ui/Icon.tsx";
import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import type { AvailableIcons } from "site/components/ui/Icon.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

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
  banners,
  title,
  configs = {},
  icons
}: Props) {
  const id = useId();

  if (!banners?.length) return <></>;

  const {
    autoplay = {},
    slidesPerView = 1.6,
    spaceBetween = 16,
    centeredSlides = true
  } = configs ?? {};

  const isEmptyTitle = !!title?.trim().match(/^<\w+>\s*<\/\w+>$/) || !title;

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const sliderConfig = {
    ...configs,
    slidesPerView,
    spaceBetween,
    centeredSlides,
    pagination: {
      enabled: configs?.pagination?.enabledMobile ?? false
    },
    breakpoints: {
      768: {
        slidesPerView: 2.3,
        spaceBetween: 64,
        centeredSlides: false
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 64,
        centeredSlides: false,
        pagination: {
          enabled: configs?.pagination?.enabledDesktop ?? false
        }
      }
    },
    autoplay: autoplayConfig
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
      classesContainer="banner-media-section min-h-[650px] lg:min-h-[303px]"
    >
      <div class="flex flex-col w-full max-w-[1536px] mx-auto gap-4 lg:px-4 lg:gap-6">
        <div class="flex items-center justify-between flex-col-reverse gap-8 lg:flex-row lg:gap-0 lg:items-start">
          <div class="flex w-full lg:w-[65%] xl:w-[55%]">
            <BannerSlider
              configs={sliderConfig}
              rootId={id}
              banners={defaultPropBanners}
            />
          </div>
          <div class="w-full flex flex-col items-center justify-center max-w-[600px] px-4 lg:w-[35%] xl:w-[45%]">
            {!isEmptyTitle && (
              <div class="flex text-center lg:text-left">
                <Text title={title} />
              </div>
            )}

            {icons && (
              <div class="w-full mt-4 flex flex-wrap justify-center item-center gap-x-[24px] lg:justify-start">
                {icons.map(({ id, href }) => (
                  <a target="_blank" key={id} title={id} href={href}>
                    <Icon id={id} size={32} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[682px] lg:h-[335px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
