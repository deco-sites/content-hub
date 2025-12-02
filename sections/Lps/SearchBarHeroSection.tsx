import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title Barra de Busca com Título
 * @description Seção hero simples com título, campo de busca e botão (somente layout).
 */
export interface Props {
  section?: ISection;
  /** @default Sobre O Que Quer Descobrir Hoje? */
  title?: string;
  /** @default O que você procura? */
  placeholder?: string;
  /** @default Pesquisar */
  buttonLabel?: string;
  /** @default #041E50 */
  buttonBgColor?: string;
}

export default function SearchBarHeroSection({
  section,
  title = "Sobre O Que Quer Descobrir Hoje?",
  placeholder = "O que você procura?",
  buttonLabel = "Pesquisar",
  buttonBgColor = "#041E50",
}: Props) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      <div
        class="
          w-full mx-auto px-4 py-6 md:pt-10 md:pb-[5.5rem]
          flex flex-col items-start md:items-center text-left md:text-center gap-3
        "
      >
        <Text
          title={title}
          classes={{
            container:
              "font-electrolux text-[#041E50] font-semibold text-2xl md:text-4xl leading-none tracking-normal capitalize",
          }}
        />

        {/* Wrapper exato do conjunto: 1078px (868 + 16 + 194) em desktop */}
        <div class="w-full max-w-full md:max-w-[1078px]">
          {/* Mobile: coluna (1fr). Desktop: grid 868px / 194px com gap 16px */}
          <div class="grid grid-cols-1 gap-4 md:grid-cols-[868px_194px] md:gap-4 md:justify-center">
            {/* Input com placeholder visual sobreposto */}
            <div class="relative">
              <input
                type="search"
                aria-label="Buscar artigos"
                placeholder={placeholder}
                readOnly
                class="
                  w-full h-[60px]
                  border-2 border-[#7B8A9C]
                  rounded-[2px]
                  bg-white appearance-none
                  px-4
                  text-[16px] leading-[24px]
                  placeholder-transparent
                  focus:outline-none
                  focus:ring-2 focus:ring-[#041E50]/20
                  focus:border-[#7B8A9C]
                "
              />

              {/* Placeholder visual (ícone + texto) */}
              <div
                aria-hidden="true"
                class="
                  pointer-events-none
                  absolute inset-0
                  flex items-center justify-start
                  pl-4 gap-3 text-[#ADB9C3]
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

            {/* Botão: full width no mobile, 194x60 no desktop */}
            <button
              type="button"
              aria-label={buttonLabel}
              class="
                h-[60px]
                w-full md:w-[194px]
                px-6
                text-white font-electrolux font-semibold text-[16px] leading-[24px]
                rounded-[2px]
                border-2 border-[#7B8A9C]
                whitespace-nowrap
              "
              style={{ backgroundColor: buttonBgColor }}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
