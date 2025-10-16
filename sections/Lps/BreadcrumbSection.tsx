// sections/Lps/BreadcrumbSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import BreadcrumbIsland from "site/islands/BreadcrumbIsland.tsx";

/**
 * @title Breadcrumb
 * @description Trilha automática via URL (island) + override no Admin.
 */

type SeparatorKind = "chevron" | "slash" | "dot" | "custom";

export interface BreadcrumbSectionProps {
  section?: ISection;
  homeLabel?: string;
  homeHref?: string;
  /**
   * @title Separador
   * @enum ["chevron","slash","dot","custom"]
   * @default chevron
   */
  separator?: SeparatorKind;
  /** @title Separador customizado (quando "custom") @default > */
  customSeparator?: string;
  /** @title Uppercase nos rótulos @default false */
  uppercase?: boolean;
  /** @title Cor não selecionado @default text-[color:var(--color-foreground-secondary,#2B2936)] */
  textColor?: string;
  /** @title Cor selecionado @default text-[color:var(--color-foreground-secondary,#2B2936)] */
  currentColor?: string;
  /** @title Cor separador @default text-[#5B6A78] */
  separatorColor?: string;
  /**
   * @title Tamanho da fonte
   * @default text-[16px]
   */
  textSize?: string;
  /** @title Classe de fonte @default font-electrolux */
  fontFamilyClass?: string;
  /**
   * @title Classe do container
   * @default max-w-[1216px] mx-auto px-4 md:px-6
   */
  containerClass?: string;
  /** @title Mapa de rótulos por slug */
  labelsMap?: Record<string, string>;
  /** @title Remover prefixos do path */
  stripPrefixes?: string[];
  /** @title Path Override (Admin/Preview) */
  pathOverride?: string;

  /** @title Ativar scroll lateral em mobile @default true */
  enableMobileScroll?: boolean;
}

export default function BreadcrumbSection({
  section,
  homeLabel = "Início",
  homeHref = "/",
  separator = "chevron",
  customSeparator = ">",
  uppercase = false,
  textColor = "text-[color:var(--color-foreground-secondary,#2B2936)]",
  currentColor = "text-[color:var(--color-foreground-secondary,#2B2936)]",
  separatorColor = "text-[#5B6A78]",
  // 16px em todas as larguras (pedido do QA/cliente)
  textSize = "text-[16px]",
  fontFamilyClass = "font-electrolux",
  containerClass = "max-w-[1216px] mx-auto px-4 md:px-6",
  labelsMap = {},
  stripPrefixes = [],
  pathOverride,
  enableMobileScroll = true,
}: BreadcrumbSectionProps) {
  const id = useId();

  // classes que habilitam a pista de scroll só em mobile
  const scrollerClasses = enableMobileScroll
    ? // -mx-4/px-4 para o scroll pegar de borda a borda em mobile; em md, volta ao normal
      "md:overflow-visible overflow-x-auto overscroll-x-contain -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar"
    : "";

  // essas classes garantem que o conteúdo do breadcrumb não quebre linha
  // (aplicaremos no container imediatamente acima dos itens)
  const trackClasses = "whitespace-nowrap inline-flex items-center gap-2";

  return (
    <Section {...section} id={id}>
      {/* Placeholder SSR alinhado à esquerda */}
      <div class={`${containerClass} self-start w-full`}>
        <div class="py-3">
          <div class="h-4 w-40 rounded" />
        </div>
      </div>

      {/* Island (client) com scroller em mobile */}
      <div class={`${containerClass} self-start w-full`}>
        <div
          class={`py-3 ${scrollerClasses}`}
          role="region"
          aria-label="Trilha de navegação"
        >
          <div class={trackClasses}>
            <BreadcrumbIsland
              homeLabel={homeLabel}
              homeHref={homeHref}
              separator={separator}
              customSeparator={customSeparator}
              uppercase={uppercase}
              textColor={textColor}
              currentColor={currentColor}
              separatorColor={separatorColor}
              textSize={textSize}
              fontFamilyClass={fontFamilyClass}
              containerClass="" // evitar nesting de padding interno duplicado
              labelsMap={labelsMap}
              stripPrefixes={stripPrefixes}
              pathOverride={pathOverride}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* Fallback para Async Rendering do Deco */
export function LoadingFallback() {
  return (
    <div class="max-w-[1216px] mx-auto px-4 md:px-6 self-start w-full py-3">
      <div class="h-4 w-40 rounded bg-[#E6EDF2]" />
    </div>
  );
}
