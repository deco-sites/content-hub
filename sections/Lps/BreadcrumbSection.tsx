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

  /** @title Rótulo da Home @default Início */
  homeLabel?: string;

  /** @title Link da Home @default / */
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

  /** @title Cor dos links (Tailwind/hex) @default text-[#5B6A78] */
  textColor?: string;

  /** @title Cor do item atual @default text-[#041E50] */
  currentColor?: string;

  /** @title Cor do separador @default text-[#9AA6B2] */
  separatorColor?: string;

  /**
   * @title Tamanho da fonte (Tailwind)
   * @description Ex.: "text-[14px] md:text-[16px]"
   * @default text-[14px] md:text-[16px]
   */
  textSize?: string;

  /**
   * @title Classe de fonte
   * @description Normalmente "font-electrolux"
   * @default font-electrolux
   */
  fontFamilyClass?: string;

  /**
   * @title Classe do container (alinhamento à esquerda)
   * @description Ex.: "max-w-[1216px] mx-auto px-4 md:px-6"
   * @default max-w-[1216px] mx-auto px-4 md:px-6
   */
  containerClass?: string;

  /** @title Mapa de rótulos por slug */
  labelsMap?: Record<string, string>;

  /** @title Remover prefixos do path */
  stripPrefixes?: string[];

  /**
   * @title Path Override (Admin/Preview)
   * @description Ex.: "/content-hub-brand"
   */
  pathOverride?: string;
}

export default function BreadcrumbSection({
  section,
  homeLabel = "Início",
  homeHref = "/",
  separator = "chevron",
  customSeparator = ">",
  uppercase = false,
  textColor = "text-[#5B6A78]",
  currentColor = "text-[#041E50]",
  separatorColor = "text-[#9AA6B2]",
  textSize = "text-[14px] md:text-[16px]",          // 14px / 16px
  fontFamilyClass = "font-electrolux",              // Electrolux Sans
  containerClass = "max-w-[1216px] mx-auto px-4 md:px-6", // alinhado à esquerda no grid
  labelsMap = {},
  stripPrefixes = [],
  pathOverride,
}: BreadcrumbSectionProps) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      {/* Placeholder SSR */}
    <div class={`${containerClass} self-start w-full`}>
        <div class="py-3">
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

// Fallback para Async Rendering do Deco
export function LoadingFallback() {
  return (
    <div class="max-w-[1216px] mx-auto px-4 md:px-6 py-3">
      <div class="h-4 w-40 rounded bg-[#E6EDF2]" />
    </div>
  );
}
