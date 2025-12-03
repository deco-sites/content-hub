import { useCallback, useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import CustomInfoCardSlider from "site/islands/CustomInfoCardSlider.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";

/**
 * @title Slider de Artigos/Blocos
 * @description Slider de blocos (imagem + texto) semelhante ao InfoCard.
 */
export interface Props {
  section?: ISection; 
  infoCards?: IInfoCardCustom[];
  configs?: ISliderConfigs;
}

export default function HomeHubInfoSection({
  section,
  infoCards = [],
  configs,
}: Props) {
  const id = useId();

  if (!infoCards.length) return null;

  const sliderDefaults: ISliderConfigs = {
    loop: true,
    speed: 300,
    spaceBetween: 32,
    slidesPerView: 1,
    slidesPerViewResponsive: { mobile: 1, tablet: 1, desktop: 1 },

    customNavigation: { enabledDesktop: false, enabledMobile: false },
    customPagination: {
      enabledDesktop: true,
      enabledMobile: true,
      clickable: true,
    },
    autoplay: { enabled: false, delay: 5000 },
    ...(configs || {}),
  };

  const clickInternalButton = useCallback((ariaLabel: string) => {
    if (typeof document === "undefined") return;
    const root = document.getElementById(id);
    if (!root) return;

    const btn = root.querySelector<HTMLButtonElement>(`button[aria-label="${ariaLabel}"]`);
    if (btn) {
      btn.click();
      return;
    }

  }, [id]);

  const controls = useSignal<{
    prev?: () => void;
    next?: () => void;
    setPage?: (p: number) => void;
    getPage?: () => number;
    totalPages?: number;
  } | null>(null);

  const handlePrev = useCallback(() => {
    if (controls.value?.prev) return controls.value.prev();
    return clickInternalButton("Anterior");
  }, [controls, clickInternalButton]);

  const handleNext = useCallback(() => {
    if (controls.value?.next) return controls.value.next();
    return clickInternalButton("Próximo");
  }, [controls, clickInternalButton]);

   useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.getElementById(id);
    if (!root) return;

    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (!root.contains(active)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    root.addEventListener("keydown", onKey);
    return () => root.removeEventListener("keydown", onKey);
  }, [id, handlePrev, handleNext]);

  return (
    <Section
      {...section}
      id={id}
      classesContainer="home-hub-section w-full max-w-none px-0"
    >
      <div class="relative w-full">
        {/* Arrow Esquerda */}
        <button
          type="button"
          aria-label="Anterior (externo)"
          data-slider-target={id}
          data-slider-action="prev"
          onClick={handlePrev}
          class="absolute left-3 top-1/2 -translate-y-[320%] z-20 w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-800 bg-white hover:bg-gray-100 text-gray-800"
        >
          {/* SVG seta ou caractere — eu usei SVG para melhor aparência */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        {/* Slider */}
        <div class="w-4/5 mx-auto overflow-hidden">
          <CustomInfoCardSlider
            rootId={id}
            infoCards={infoCards}
            configs={sliderDefaults}
            onRegisterControls={(c) => (controls.value = c)}
          />
        </div>

        {/* Arrow Direita */}
        <button
          type="button"
          aria-label="Próximo (externo)"
          data-slider-target={id}
          data-slider-action="next"
          onClick={handleNext}
          class="absolute right-3 top-1/2 -translate-y-[320%] z-20 w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-800 bg-white hover:bg-gray-100 text-gray-800"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[420px] lg:h-[460px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
