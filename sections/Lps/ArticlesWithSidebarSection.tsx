// ArticlesWithSidebarSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

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

export interface CategoryItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface Props {
  section?: ISection;
  title?: string;
  subtitleLinkText?: string;
  subtitleLinkHref?: string;
  categories?: CategoryItem[];
  articles?: ArticleItem[];
  groupSize?: number;
  showTitleOnFirstGroup?: boolean;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function ArticlesWithSidebarSection({
  section,
  title = "Outros artigos",
  subtitleLinkText = "Conheça todos os nossos outros artigos aqui",
  subtitleLinkHref = "#",
  categories = [],
  articles = [],
  groupSize = 3,
  showTitleOnFirstGroup = true,
}: Props) {
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

  const groups = chunk(processedArticles, groupSize);

  return (
    <Section {...section} id={id}>
      {/* 1280→1200, 1440→1360, 1920→1600 */}
      <div class="w-full max-w-[1200px] xl:max-w-[1360px] 2xl:max-w-[1600px] mx-auto px-1">
        {/* Mobile: categorias em pills */}
        {categories.length > 0 && (
          <nav class="lg:hidden -mx-4 px-4 mb-4 overflow-x-auto">
            <ul class="flex gap-3 py-2">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <a
                    href={cat.href ?? "#"}
                    class={
                      "whitespace-nowrap text-sm px-3 py-2 rounded-full border " +
                      (cat.active
                        ? "border-[#041E50] text-[#041E50] font-semibold"
                        : "border-[#DFE7EA] text-[#5B6A78] hover:text-[#041E50]")
                    }
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Desktop: sidebar + grupos */}
        <div class="grid grid-cols-1 lg:grid-cols-[282px_1fr] gap-6">
          {/* ASIDE com divisor lateral 2px #7B8A9C e linhas que não encostam */}
          <aside class="hidden lg:block">
            {categories.length > 0 && (
              <div class="relative">
                {/* Linha vertical (2px, #7B8A9C, 720px) */}
                <div
                  aria-hidden="true"
                  class="absolute top-0 right-0 w-[2px] h-[720px] bg-[#7B8A9C]"
                />
                <div class="sticky top-6">
                  {/* Título do menu */}
                  <h3 class="font-electrolux font-semibold text-[16px] leading-[20px] text-[#011E41] mb-3">
                    Busque por categoria
                  </h3>

                  <ul>
                    {categories.map((cat) => (
                      <li key={cat.label}>
                        <a
                          href={cat.href ?? "#"}
                          class={
                            "block font-electrolux text-[14px] leading-[14px] text-[#011E41] " +
                            (cat.active ? "font-semibold" : "font-normal hover:opacity-80")
                          }
                        >
                          <span class="block py-3 mr-3 border-b border-[#EAEBED]">
                            {cat.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </aside>

          {/* Conteúdo: grupos de 3 com título repetido */}
          <div class="space-y-10">
            {groups.map((group, gi) => (
              <section key={gi} aria-label={`${title} ${gi + 1}`}>
                {(showTitleOnFirstGroup || gi > 0) && (
                  <div class="text-center mb-4 md:mb-6">
                    {/* Título 36px */}
                    <h2 class="font-electrolux text-[#041E50] font-semibold text-[36px] leading-[40px]">
                      {title}
                    </h2>
                    {subtitleLinkText && (
                      /* Subtítulo 16px, 400, underline, 140%, cor #041E50 */
                      <a
                        href={subtitleLinkHref}
                        class="inline-block mt-2 font-electrolux font-normal text-[16px] leading-[140%] underline decoration-solid text-[#041E50]"
                      >
                        {subtitleLinkText}
                      </a>
                    )}
                  </div>
                )}

                {/* Grid 1/2/3 */}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.map((article, index) => (
                    <a
                      key={`${gi}-${index}`}
                      href={article.href ?? "#"}
                      class="border border-[#DFE7EA] flex flex-col hover:shadow-md transition bg-white">
                      {article.image?.src && (
                        <div class="w-full mb-4">
                          <img
                            src={article.image.src}
                            alt={article.image.alt ?? "Imagem do artigo"}
                            class="w-full h-auto object-cover"
                            width={article.image.sizes?.width}
                            height={article.image.sizes?.height}
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* TÍTULO DO CARD → Electrolux Sans 600, 24/28 */}
                      <h3
                        class="font-electrolux font-semibold text-[#041E50] text-[24px] leading-[28px] mb-2 pl-4 pr-4"
                        dangerouslySetInnerHTML={{
                          __html: article.title ?? "Título do artigo",
                        }}
                      />

                      <p class="text-base text-[#4F4F4F] pr-4 pl-4">
                        {article.description ?? "Descrição do artigo..."}
                      </p>

                      {article.cta && (
                        <span class="mt-4 text-sm font-semibold text-[#5B6A78] pr-4 pl-4 pb-4">
                          {article.cta}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
