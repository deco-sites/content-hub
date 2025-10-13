// islands/BreadcrumbIsland.tsx
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

type SeparatorKind = "chevron" | "slash" | "dot" | "custom";

export interface BreadcrumbIslandProps {
  homeLabel: string;
  homeHref: string;
  separator: SeparatorKind;
  customSeparator: string;
  uppercase: boolean;
  textColor: string;        // itens não selecionados
  currentColor: string;     // item atual
  separatorColor: string;   // separador (setinha)
  textSize: string;
  fontFamilyClass: string;
  containerClass: string;
  labelsMap: Record<string, string>;
  stripPrefixes: string[];
  pathOverride?: string;
}

interface Crumb { label: string; href?: string; }
const pathSig = signal<string>("");

const Chevron = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" class="inline-block align-middle shrink-0">
    <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" />
  </svg>
);
const Dot = () => (
  <span aria-hidden="true" class="inline-block align-middle w-[4px] h-[4px] rounded-full bg-current shrink-0" />
);

function prettifySlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function Separator(
  { kind, custom, className }: { kind: SeparatorKind; custom?: string; className?: string },
) {
  return (
    <span class={className}>
      {kind === "chevron" && <Chevron />}
      {kind === "slash" && <span aria-hidden="true" class="align-middle">/</span>}
      {kind === "dot" && <Dot />}
      {kind === "custom" && <span aria-hidden="true" class="align-middle">{custom || ">"}</span>}
    </span>
  );
}

export default function BreadcrumbIsland(props: BreadcrumbIslandProps) {
  // define path no client
  useEffect(() => {
    if (props.pathOverride) {
      pathSig.value = props.pathOverride;
    } else {
      const p = (globalThis as any)?.location?.pathname as string | undefined;
      pathSig.value = p || "/";
    }
  }, [props.pathOverride]);

  // monta crumbs
  const segments = (pathSig.value || "")
    .split("/")
    .filter(Boolean)
    .filter((seg) => !props.stripPrefixes.includes(seg));

  let crumbs: Crumb[] = [{ label: props.homeLabel, href: props.homeHref }];

  if (segments.length > 0) {
    const tail: Crumb[] = segments.map((seg, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = props.labelsMap[seg] ?? prettifySlug(seg);
      const isLast = i === segments.length - 1;
      return { label, href: isLast ? undefined : href };
    });
    crumbs = [...crumbs, ...tail];
  } else if (pathSig.value && pathSig.value !== "/") {
    crumbs = [...crumbs, { label: "Página atual" }];
  } else if (!pathSig.value) {
    crumbs = [...crumbs, { label: "Página atual" }];
  }

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <div class={`${props.containerClass} self-start w-full`}>
      {/* Scroller no mobile; visível normal no desktop */}
      <div class="md:overflow-visible overflow-x-auto -mx-4 md:mx-0 px-4 no-scrollbar">
        <nav aria-label="breadcrumb">
          <ol
            class={[
              // mobile: uma linha só com scroll; desktop: pode quebrar
              "flex items-center gap-x-2",
              "flex-nowrap md:flex-wrap",
              "whitespace-nowrap md:whitespace-normal",
              props.fontFamilyClass,
              "font-normal",           // 400 itens não selecionados
              "leading-[140%]",
              props.textSize,
              props.textColor,
              props.uppercase ? "uppercase tracking-wide" : "",
              "text-left !text-left",
              "justify-start",
            ].join(" ")}
          >
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <li
                  key={`${crumb.label}-${idx}`}
                  class="flex items-center gap-2 min-w-0"  // min-w-0 permite truncar conteúdo dentro
                >
                  {isLast || !crumb.href ? (
                    <span
                      class={[
                        "inline-flex items-center align-middle",
                        "font-semibold",         // 600 selecionado
                        props.currentColor,
                        // Truncar último item no mobile para não “vazar”
                        "truncate max-w-[70vw] sm:max-w-[60vw] md:max-w-none",
                      ].join(" ")}
                      aria-current="page"
                      title={crumb.label}
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.href}
                      class="inline-flex items-center align-middle hover:underline truncate max-w-[55vw] sm:max-w-[45vw] md:max-w-none"
                      title={crumb.label}
                    >
                      {crumb.label}
                    </a>
                  )}
                  {!isLast && (
                    <Separator
                      kind={props.separator}
                      custom={props.customSeparator}
                      className={["mx-1 inline-flex items-center align-middle", props.separatorColor].join(" ")}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* deno-lint-ignore react-no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* esconder scrollbar apenas no mobile */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
}
