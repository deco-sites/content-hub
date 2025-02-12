import BannerSliderMedia from "site/islands/BannerSliderMedia.tsx";
import { Text } from "@eluxlab/library-components";
import type { RichText } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IBannerSlide } from "site/types/Banner.d.ts";

/**
 * @description Seção com um slider de banners.
 */
interface Props {
  /**
   * @title Banners
   */
  banners?: IBannerSlide[];

  /**
   * @title Configurações do Slider
   */
  configs?: ISliderConfigs;

  /**
   * @title Configurações dos textos ao lado
   */
  title?: RichText;
}

export default function BannerMediaSliderSection({
  banners,
  title,
  configs = {},
}: Props) {
  const rootId = useId();

  if (!banners?.length) return <></>;

  const { autoplay = {} } = configs ?? {};
  const isEmptyTitle = !!title?.trim().match(/^<\w+>\s*<\/\w+>$/) || !title;

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000,
      }
    : undefined;

  const sliderConfig = {
    ...configs,
    slidesPerView: 3,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    autoplay: autoplayConfig,
  };

  return (
    <>
      <div class="section-container flex flex-col w-full gap-4 lg:gap-6">
        <div class="flex w-full mx-auto px-[10px] justify-between flex-row items-stretch media-with-text-slider">
          <div class="flex w-1/2 media-slider">
            <BannerSliderMedia
              configs={sliderConfig}
              rootId={rootId}
              banners={banners}
            />
          </div>
          <div class="flex w-1/2 media-text">
            {!isEmptyTitle && (
              <Text title={title} classes={{ container: "section-title" }} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <h2>loading...</h2>
    </div>
  );
}
