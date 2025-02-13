import ArticleSlider from "site/islands/ArticleSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IArticle } from "site/types/Article.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

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
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "500px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
