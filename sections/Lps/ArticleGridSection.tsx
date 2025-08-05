import { TextArea } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Seção de Artigos em Grid
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

  return (
    <Section {...section} id={id}>
      <div id="article-grid-container" class="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[8px]">
        {articles.map((
          article,
          index,
        ) => (
          <div key={index} class="border border-[#dfe7ea] flex flex-col hover:shadow-md transition">
            <a href={article.href}>
              <div class="article-image-container">
                {article.image?.src?.mobile || article.image?.src?.desktop ? (
                  <ResponsiveImage {...article.image} />
                ) : null}
              </div>
              <div class="flex flex-col justify-start items-start w-full px-[16px] py-[24px]">
                <h3
                  class="text-xl font-semibold text-[#041E50] mb-[8px]"
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
          </div>
        ))}
      </div>
      <style>
        {`
          .article-image-container img {
            height: 207px;
          }

          @media screen and (min-width:1280px) {
            #article-grid-container {
              max-width: 1200px;
            }
          }

          @media screen and (min-width:1440px) {
            #article-grid-container {
              max-width: 1360px;
            }
          }

          @media screen and (min-width:1920px) {
            #article-grid-container {
              max-width: 1600px;
            }
          }
        `}
      </style>
    </Section >
  );
}