import Section from "site/components/ui/Section.tsx";
import { lazy, Suspense } from "preact/compat";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

const BannerSlider = lazy(() => import("site/islands/BannerSlider.tsx"));

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
  configs = {}
}: Props) {
  const id = useId();

  if (!banners?.length) return <></>;

  const { autoplay = {}, slidesPerView = "auto" } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  return (
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      <Section {...section} id={id}>
        <BannerSlider
          configs={{
            ...configs,
            slidesPerView,
            autoplay: autoplayConfig
          }}
          rootId={id}
          banners={banners}
        />
      </Section>
    </Suspense>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "500px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
