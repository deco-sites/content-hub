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
  textColor: string;
  currentColor: string;
  separatorColor: string;
  textSize: string;
  /** classe da fonte (ex.: "font-electrolux") */
  fontFamilyClass: string;
  /** wrapper para alinhar à esquerda (ex.: "max-w-[1216px] mx-auto px-4 md:px-6") */
  containerClass: string;
  labelsMap: Record<string, string>;
  stripPrefixes: string[];
  pathOverride?: string;
}

interface Crumb { label: string; href?: string; }
const pathSig = signal<string>("");

const Chevron = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" class="inline-block align-middle">
    <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" />
  </svg>
);
const Dot = () => <span aria-hidden="true" class="inline-block align-middle w-[4px] h-[4px] rounded-full bg-current" />;
const HomeIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" class="inline-block align-middle">
    <path d="M3 10.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" fill="currentColor" />
  </svg>
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
      <nav aria-label="breadcrumb">
        <ol
          class={[
            "flex flex-wrap items-center gap-x-2 gap-y-1",
            props.fontFamilyClass,        // fonte Electrolux
            "font-normal",                 // weight 400
            "leading-[140%]",              // line-height 140%
            props.textSize,                // tamanho controlável
            props.textColor,
            props.uppercase ? "uppercase tracking-wide" : "",
            "!text-left",
          ].join(" ")}
        >
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li key={`${crumb.label}-${idx}`} class="flex items-center gap-2">
                {isLast || !crumb.href ? (
                  <span
                    class={[
                      "inline-flex items-center align-middle",
                      props.currentColor,
                      "whitespace-nowrap",
                    ].join(" ")}
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <a
                    href={crumb.href}
                    class="inline-flex items-center align-middle hover:underline whitespace-nowrap"
                  >
                    {idx === 0 ? (
                      <span class="inline-flex items-center gap-1">
                        <HomeIcon /> {crumb.label}
                      </span>
                    ) : (
                      crumb.label
                    )}
                  </a>
                )}
                {!isLast && (
                  <Separator
                    kind={props.separator}
                    custom={props.customSeparator}
                    className={["mx-1", "inline-flex items-center align-middle", props.separatorColor].join(" ")}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* deno-lint-ignore react-no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
