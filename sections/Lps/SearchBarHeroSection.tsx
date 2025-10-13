// SearchBarHeroSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title Barra de Busca com Título
 * @description Seção hero simples com título e campo de busca (somente layout).
 */
export interface Props {
  section?: ISection;
  /** @default Sobre O Que Quer Descobrir Hoje? */
  title?: string;
  /** @default O que você procura? */
  placeholder?: string;
}

export default function SearchBarHeroSection({
  section,
  title = "Sobre O Que Quer Descobrir Hoje?",
  placeholder = "O que você procura?",
}: Props) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      
      <div class="w-full max-w-[980px] mx-auto px-4 py-6 md:pt-10 md:pb-[5.5rem]
            flex flex-col items-start md:items-center text-left md:text-center gap-3">
        <h2
          class="
            font-electrolux
            text-[#041E50]
            font-semibold
            text-2xl md:text-4xl
            leading-none
            tracking-normal
            capitalize
          "
        >
          {title}
        </h2>

        <div class="relative w-full md:max-w-[868px] min-w-0">
          {/* Input base */}
          <input
            type="search"
            aria-label="Buscar artigos"
            placeholder={placeholder}
            class="
              w-full
              h-[60px]
              border-2 border-[#7B8A9C]
              rounded-[2px] bg-white
              appearance-none
              px-4
              text-[16px] leading-[24px]
              placeholder-transparent
              focus:outline-none
              focus:ring-2 focus:ring-[#041E50]/20
              focus:border-[#7B8A9C]
            "
            readOnly
          />

          <div
            aria-hidden="true"
            class="
              pointer-events-none
              absolute inset-0
              flex items-center justify-start md:justify-center
              pl-4 md:pl-0
              gap-3
              text-[#ADB9C3]
            "
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6 text-black">
              <path
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="font-electrolux font-semibold text-[16px] leading-[24px] tracking-normal select-none">
              {placeholder}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
