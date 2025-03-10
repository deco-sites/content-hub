import ArticleSlider from "site/islands/ArticleSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IArticle } from "site/types/Article.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultArticles } from "site/configs/ArticlesSliderSection.ts";
import { useDevice } from "@deco/deco/hooks";

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
   * @title Estilo do Artigo
   * @description Define o estilo do artigo.
   * @default "Type 1"
   */
  styleArticleOption?: "Type 1" | "Type 2";

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
  styleArticleOption = "Type 1",
  articles = DefaultArticles.articles,
  configs = DefaultArticles.configs,
}: Props) {
  const id = useId();
  const device = useDevice();

  if (!articles?.length) return null;

  const {
    spaceBetween = 8,
    slidesPerViewResponsive = {
      mobile: 1,
      tablet: 1,
      desktop: 3,
    },
    pagination,
    navigation,
  } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive?.mobile ?? 1,
    spaceBetween,
    pagination: {
      enabled: device === "desktop" ? pagination?.enabledDesktop : pagination?.enabledMobile
    },
    navigation: {
      enabled: device === "desktop" ? navigation?.enabledDesktop : navigation?.enabledMobile
    },
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive?.tablet ?? 1,
      },
      1024: {
        slidesPerView: slidesPerViewResponsive?.desktop ?? 3,
        pagination: {
          enabled: pagination?.enabledDesktop,
        },
        navigation: {
          enabled: navigation?.enabledDesktop,
        },
      },
    },
  } as ISliderConfigs;

  const defaultPropsArticles = articles.map((article) => ({
    ...article,
    image: {
      ...article.image,
      sizes: {
        ...article.image.sizes,
        width: 344,
        height: styleArticleOption === "Type 1" ? 180 : 200,
        widthMobile: 344,
        heightMobile: styleArticleOption === "Type 1" ? 180 : 200,
      },
    },
  }));

  return (
    <Section
      {...section}
      id={id}
      classesContainer={`article-slider-section article-slider-section__${styleArticleOption
        .toLowerCase()
        .replace(" ", "-")} h-full`}
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
