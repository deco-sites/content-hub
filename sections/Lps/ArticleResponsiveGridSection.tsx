import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title Section de Grid Responsivo de Artigos
 * @description Exibe artigos com número flexível de colunas, adaptando-se ao tamanho da tela.
 */
export interface ArticleItem {
  title?: string;
  description?: string;
  href?: string;
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

export interface Props {
  section?: ISection;
  articles?: ArticleItem[];
}

export default function ArticleResponsiveGridSection(
  { section, articles = [] }: Props,
) {
  const id = useId();

  if (!articles.length) return null;

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
  }));

  return (
    <Section {...section} id={id}>
      <div
        class="w-full max-w-[1500px] mx-auto grid gap-6 px-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {processedArticles.map((article, index) => (
          <a
            key={index}
            href={article.href ?? "#"}
            class="border border-[#dfe7ea] p-4 flex flex-col hover:shadow-md transition bg-white rounded-lg"
          >
            {article.image?.src && (
              <div class="w-full mb-4">
                <img
                  src={article.image.src}
                  alt={article.image.alt ?? "Imagem do artigo"}
                  class="w-full h-auto object-cover rounded-md"
                  width={article.image.sizes?.width}
                  height={article.image.sizes?.height}
                />
              </div>
            )}
            <h3
              class="text-xl font-semibold text-[#041E50] mb-2"
              dangerouslySetInnerHTML={{
                __html: article.title ?? "Título do artigo",
              }}
            />
            <p class="text-base text-[#4F4F4F] font-electrolux">
              {article.description ?? "Descrição do artigo..."}
            </p>
            {article.cta && (
              <span class="mt-4 text-sm font-semibold text-[#5B6A78]">
                {article.cta}
              </span>
            )}
          </a>
        ))}
      </div>
    </Section>
  );
}
