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
  // 👇 agora 16px em todas as larguras
  textSize = "text-[16px]",
  fontFamilyClass = "font-electrolux",
  containerClass = "max-w-[1216px] mx-auto px-4 md:px-6",
  labelsMap = {},
  stripPrefixes = [],
  pathOverride,
}: BreadcrumbSectionProps) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      {/* Placeholder SSR alinhado à esquerda */}
      <div class={`${containerClass} self-start w-full`}>
        <div class="py-3">
          <div class="h-4 w-40 rounded" />
        </div>
      </div>

      {/* Island (client) */}
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
        containerClass={containerClass}
        labelsMap={labelsMap}
        stripPrefixes={stripPrefixes}
        pathOverride={pathOverride}
      />
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
