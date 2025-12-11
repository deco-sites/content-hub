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

/** @titleBy title */
export interface GroupConfig {
  /**
   * @title Título do grupo
   * @description Título que aparece acima do grid de artigos
   */
  title?: string;
  /**
   * @title Texto do link
   * @description Texto do link que aparece abaixo do grid
   */
  linkText?: string;
  /**
   * @title URL do link
   * @description URL para onde o link deve apontar. Ex: `/inspira/blog`
   */
  linkHref?: string;
}

export interface Props {
  section?: ISection;
  /**
   * @title Configurações dos grupos
   * @description Configure título e link para cada grupo de artigos
   */
  groups?: GroupConfig[];
  

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
  categories = DEFAULT_CATEGORIES,
  articles = [],
  groupSize = 3,
  showTitleOnFirstGroup = true,
  dividerHeightPx = 720,
  groups: groupsConfig,
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

  const articleGroups = chunk(processedArticles, groupSize);

  // Obtém configuração dos grupos do section ou do props
  const sectionGroupsConfig = ((section?.props?.groups as GroupConfig[] | undefined) || groupsConfig || []);

  return (
    <Section {...section} id={id}>
      <div class="w-full mx-auto">
        {/* MOBILE: categorias em pills (scroll horizontal com barra oculta) */}
        {categories.length > 0 && (
          <>
            <nav
              id={`${id}-cats-scroll`}
              class="lg:hidden -mx-4 px-4 mb-4 overflow-x-auto"
              aria-label="Categorias do blog (mobile)"
            >
              <ul class="inline-flex gap-3 py-2 whitespace-nowrap">
                {categories.map((cat) => {
                  return (
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
                  );
                })}
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
            {articleGroups.map((group, gi) => {
              const groupConfig = sectionGroupsConfig[gi] || {};
              const groupTitle = groupConfig.title?.trim();
              const showGroupTitle = (showTitleOnFirstGroup || gi > 0) && groupTitle;
              
              const groupLinkText = groupConfig.linkText;
              const groupLinkHref = groupConfig.linkHref;
              const hasValidLink = groupLinkText && groupLinkText.trim().length > 0;

              return (
                <section key={gi} aria-label={groupTitle ? `${groupTitle}` : `Grupo ${gi + 1}`}>
                  {showGroupTitle && (
                    <div class="text-center mb-4 md:mb-6">
                      <Text
                        title={groupTitle}
                        classes={{
                          container:
                            "font-electrolux text-[#041E50] font-semibold text-[36px] leading-[40px]",
                        }}
                      />
                      {/* título do grupo exibido acima do grid */}
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
                  {hasValidLink && (
                    <div class="text-center mt-4 rounded-[16px] py-4 px-2">
                      <a
                        href={groupLinkHref || "#"}
                        class="inline-block font-electrolux font-normal text-[16px] leading-[140%] underline decoration-solid text-[#041E50]"
                      >
                        {groupLinkText}
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
