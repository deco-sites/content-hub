import { TextArea } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title Section de Grid de Artigos
 * @description Exibe artigos em um grid responsivo (4 colunas no desktop e 2 no mobile).
 */
export interface ArticleItem {
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
  image: {
    src: string;
    alt?: string;
    sizes?: {
      width: number;
      height: number;
      widthMobile: number;
      heightMobile: number;
    };
  };
}

export interface ArticleGridSectionProps {
  section?: ISection;
  articles?: ArticleItem[];
}

export default function ArticleGridSection(
  {
    section,
    articles = [],
  }: ArticleGridSectionProps,
) {
  const id = useId();

  if (!articles?.length) return null;

  const processedArticles = articles
    .map((article) => ({
      ...article,
      image: {
        ...article.image,
        sizes: {
          ...(article.image?.sizes ??
            {}),
          width: 344,
          height: 180,
          widthMobile: 344,
          heightMobile: 180,
        },
      },
    }));

  return (
    <Section {...section} id={id}>
      <div class="w-full max-w-[1500px] mx-auto my-[24px] grid grid-cols-2 lg:grid-cols-4 gap-[8px]">
        {processedArticles.map((
          article,
          index,
        ) => (
          <a
            key={index}
            href={article.href ?? "#"}
            class="border border-[#dfe7ea] flex flex-col hover:shadow-md transition"
          >
            {article.image?.src && (
              <div class="w-full">
                <img
                  src={article.image
                    .src}
                  alt={article.image
                    .alt ??
                    "Imagem do artigo"}
                  class="w-full h-auto object-cover"
                  width={article.image
                    .sizes?.width ??
                    344}
                  height={article.image
                    .sizes?.height ??
                    180}
                />
              </div>
            )}
            <div class="p-4">
              <h3
                class="text-xl font-semibold text-[#041E50] mb-2"
                dangerouslySetInnerHTML={{
                  __html: article.title ??
                    "Título do artigo",
                }}
              />
              <p class="text-base font-normal leading-[140%] text-[#4F4F4F] font-electrolux">
                {article.description ??
                  "Descrição do artigo..."}
              </p>
              {article.cta && (
                <span class="mt-4 text-sm font-semibold leading-[140%] text-[#5B6A78]">
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
