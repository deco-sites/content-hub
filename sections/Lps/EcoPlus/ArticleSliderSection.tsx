import Section from "site/components/ui/Section.tsx";
import { lazy, Suspense } from "preact/compat";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IArticle } from "site/types/Article.d.ts";

const ArticleSlider = lazy(() => import("site/islands/ArticleSlider.tsx"));

/**
 * @description Componente de seção contendo um slider de cartões informativos.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Lista de Artigos
   * @description Conjunto de artigos a serem exibidos dentro do slider.
   */
  articles?: IArticle[];

  /**
   * @title Configurações do Slider
   * @description Define os parâmetros de exibição e comportamento do slider.
   */
  configs?: ISliderConfigs;
}

export default function ArticleSliderSection({
  section,
  articles,
  configs = {}
}: Props) {
  const id = useId();

  if (!articles?.length) return <></>;

  const { autoplay = {}, slidesPerView = 1, spaceBetween = 10 } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const breakpoints: Record<number, ISliderConfigs> = {
    1024: {
      slidesPerView: 3,
      pagination: {
        enabled: configs?.pagination?.enabledDesktop ?? false
      }
    }
  };

  return (
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      <Section {...section} id={id} classesContainer="article-slider-section">
        <div class="flex w-full mx-auto px-[10px]">
          <ArticleSlider
            configs={{
              ...configs,
              slidesPerView,
              spaceBetween,
              autoplay: autoplayConfig,
              breakpoints,
              pagination: {
                enabled: configs?.pagination?.enabledMobile ?? false,
                clickable: configs?.pagination?.clickable ?? false,
                dynamicBullets: configs?.pagination?.dynamicBullets ?? false,
                dynamicMainBullets: configs?.pagination?.dynamicMainBullets ?? 0
              }
            }}
            rootId={id}
            articles={articles}
          />
        </div>
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
