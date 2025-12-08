import { Text } from "@eluxlab/library-components";
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
  /** altura fixa da barra divisória (desktop) */
  dividerHeightPx?: number;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/** categorias padrão */
const DEFAULT_CATEGORIES: CategoryItem[] = [
  { label: "Todos", href: "/inspira/blog" },
  { label: "Receitas", href: "/inspira/blog/receitas" },
  { label: "Dicas", href: "/inspira/blog/dicas" },
  { label: "Produtos", href: "/inspira/blog/produtos" },
  { label: "Sustentabilidade", href: "/inspira/blog/sustentabilidade" },
];

export default function ArticlesWithSidebarSection({
  section,
  title = "Outros artigos",
  subtitleLinkText = "Conheça todos os nossos outros artigos aqui",
  subtitleLinkHref = "#",
  categories = DEFAULT_CATEGORIES,
  articles = [],
  groupSize = 3,
  showTitleOnFirstGroup = true,
  dividerHeightPx = 720,
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
      <div class="w-full max-w-[1200px] xl:max-w-[1360px] 2xl:max-w-[1600px] mx-auto">
        {/* MOBILE: categorias em pills (scroll horizontal com barra oculta) */}
        {categories.length > 0 && (
          <>
            <nav
              id={`${id}-cats-scroll`}
              class="lg:hidden -mx-4 px-4 mb-4 overflow-x-auto"
              aria-label="Categorias do blog (mobile)"
            >
              {/* usar inline-flex + whitespace-nowrap para rolar lateralmente */}
              <ul class="inline-flex gap-3 py-2 whitespace-nowrap">
                {categories.map((cat) => (
                  <li key={cat.label} class="inline-block">
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

            {/* Esconde a barra de rolagem (Firefox/Chromium/WebKit) sem desabilitar o scroll */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
#${id}-cats-scroll { scrollbar-width: none; -ms-overflow-style: none; }
#${id}-cats-scroll::-webkit-scrollbar { display: none; }
              `,
              }}
            />
          </>
        )}

        {/* DESKTOP: sidebar + divisor (sticky) + conteúdo */}
        <div class="grid grid-cols-1 lg:grid-cols-[282px_2px_1fr] lg:gap-8">
          {/* Sidebar fixa (desktop) */}
          <aside class="hidden lg:block sticky top-6 self-start">
            {categories.length > 0 && (
              <nav aria-label="Busque por categoria (desktop)">
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
                          (cat.active
                            ? "font-semibold"
                            : "font-normal hover:opacity-80")
                        }
                      >
                        <span class="block py-3 mr-3 border-b border-[#EAEBED]">
                          {cat.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          {/* Divisor: acompanha o aside (sticky) e mantém altura fixa */}
          <div
            aria-hidden="true"
            class="hidden lg:block sticky top-6 bg-[#7B8A9C] w-[2px] rounded"
            style={{ height: `${dividerHeightPx}px` }}
          />

          {/* Conteúdo */}
          <div class="space-y-10">
            {groups.map((group, gi) => (
              <section key={gi} aria-label={`${title} ${gi + 1}`}>
                {(showTitleOnFirstGroup || gi > 0) && (
                  <div class="text-center mb-4 md:mb-6">
                    <Text
                      title={title}
                      classes={{
                        container:
                          "font-electrolux text-[#041E50] font-semibold text-[36px] leading-[40px]",
                      }}
                    />
                    {/* link sai daqui e vai pro final do grid */}
                  </div>
                )}

                {/* Grid 1/2/3 */}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.map((article, index) => (
                    <a
                      key={`${gi}-${index}`}
                      href={article.href ?? "#"}
                      class="border border-[#DFE7EA] flex flex-col hover:shadow-md transition bg-white"
                    >
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

                      <Text
                        title={article.title ?? "Título do artigo"}
                        classes={{
                          container:
                            "font-electrolux font-semibold text-[#041E50] text-[24px] leading-[28px] mb-2 px-4",
                        }}
                      />

                      <p class="text-base text-[#4F4F4F] px-4">
                        {article.description ?? "Descrição do artigo..."}
                      </p>

                      {article.cta && (
                        <span class="mt-4 text-sm font-semibold text-[#5B6A78] px-4 pb-4">
                          {article.cta}
                        </span>
                      )}
                    </a>
                  ))}
                </div>

                {/* Link abaixo do GRID (como no Figma) */}
                {subtitleLinkText && (
                  <div class="text-center mt-4">
                    <a
                      href={subtitleLinkHref}
                      class="inline-block font-electrolux font-normal text-[16px] leading-[140%] underline decoration-solid text-[#041E50]"
                    >
                      {subtitleLinkText}
                    </a>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
