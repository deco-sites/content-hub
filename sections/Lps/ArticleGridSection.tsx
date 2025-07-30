import { TextArea } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Section de Grid de Artigos
 * @description Exibe artigos em um grid responsivo (4 colunas no desktop e 2 no mobile).
 */
export interface Article {
  /**
 * @title Título
 * @description Título do artigo.
 */
  title?: string;
  /**
  * @title Texto
  * @description Uma prévia do texto do artigo.
  */
  description?: string;
  /**
  * @title Link
  */
  href?: string;
  /**
   * @title Texto do botão
  */
  cta?: string;
  /**
  * @title Imagens
  */
  image: IResponsiveImage;
}

export interface ArticleGridSectionProps {
  section?: ISection;
  articles?: Article[];
}

export default function ArticleGridSection(
  {
    section,
    articles = [],
  }: ArticleGridSectionProps,
) {
  const id = useId();

  if (!articles?.length) return null;

  const processedArticles = articles.map((article) => ({
    ...article,
    image: {
      ...article.image,
      sizes: {
        ...(article.image?.sizes ?? {}),
        width: 344,
        height: 180,
        widthMobile: 344,
        heightMobile: 180,
      },
    },
  }))

  return (
    <Section {...section} id={id}>
      <div class="w-full max-w-[1500px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
        {processedArticles.map((
          article,
          index,
        ) => (
          <a
            key={index}
            href={article.href}
            class="border border-[#dfe7ea] flex flex-col hover:shadow-md transition"
          >
            <div class="w-full ma">
              {article.image?.src?.mobile || article.image?.src?.desktop ? (
                <ResponsiveImage {...article.image} class="w-full h-auto object-cover" />
              ) : null}
            </div>
            <div class="p-4">
              <h3
                class="text-xl font-semibold text-[#041E50] mb-2"
              >
                {article.title}
              </h3>
              <p class="text-base font-normal leading-[140%] text-[#4F4F4F] font-electrolux mb-[16px]">
                {article.description}
              </p>
              {article.cta && (
                <span class="text-sm font-semibold leading-[140%] text-[#5B6A78]">
                  {article.cta}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </Section >
  );
}
