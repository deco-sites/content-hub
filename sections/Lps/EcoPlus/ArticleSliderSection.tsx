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

  const { autoplay = {}, slidesPerView = 1, spaceBetween = 8 } = configs ?? {};

  const autoplayConfig = autoplay.enabled
    ? {
        delay: autoplay.delay ?? 3000
      }
    : undefined;

  const sliderConfig = {
    ...configs,
    autoplay: autoplayConfig,
    slidesPerView,
    spaceBetween,
    pagination: {
      enabled: configs?.pagination?.enabledMobile ?? false
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        pagination: {
          enabled: configs?.pagination?.enabledDesktop ?? false
        }
      }
    }
  } as ISliderConfigs;

  const defaultPropsArticles = articles.map(article => ({
    ...article,
    image: {
      ...article.image,
      sizes: {
        ...article.image.sizes,
        width: 344,
        height: 180,
        widthMobile: 344,
        heightMobile: 180
      }
    }
  }));

  return (
    <Section
      {...section}
      id={id}
      classesContainer="article-slider-section h-full min-h-[630px] lg:min-h-[585px]"
    >
      <div class="flex w-full mx-auto">
        <ArticleSlider
          configs={sliderConfig}
          rootId={id}
          articles={defaultPropsArticles}
        />
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[662px] lg:h-[637px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
