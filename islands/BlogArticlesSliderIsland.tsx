import { Text } from "@eluxlab/library-components";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";

type Slide = {
  image: IResponsiveImage;
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
};

interface Props {
  rootId: string;
  slides: Slide[];
  panelBgColor: string;
  defaultCtaLabel: string;
}

/**
 * Slider com translateX baseado na largura do viewport (overflow-hidden).
 * Mantém o painel 421x471 no desktop e fluido no mobile.
 */
export default function BlogArticlesSliderIsland({
  slides,
  panelBgColor,
  defaultCtaLabel,
}: Props) {
  const [index, setIndex] = useState(0);
  const [slideW, setSlideW] = useState(0); // largura do viewport
  const viewportRef = useRef<HTMLDivElement>(null); // wrapper overflow-hidden
  const trackRef = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const safeIndex = (i: number) => (i + count) % count;
  const go = (i: number) => setIndex(safeIndex(i));

  // mede a largura do viewport
  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current) return;
      setSlideW(viewportRef.current.clientWidth);
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  const slidesMarkup = useMemo(
    () =>
      slides.map((s, i) => (
        <div
          key={i}
          class="shrink-0 w-full snap-center"
          aria-roledescription="slide"
        >
          <div class="max-w-screen-2xl mx-auto">
            {/* min-w-0 evita overflow horizontal do grid */}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_421px] gap-0 min-w-0">
              {/* Imagem */}
              <div class="h-[300px] sm:h-[360px] md:h-[420px] lg:h-[471px] min-w-0 overflow-hidden">
                <ResponsiveImage {...s.image} />
              </div>

              {/* Painel de texto */}
              <aside
                class="text-panel flex flex-col justify-center p-6 md:p-8 lg:p-10 lg:w-[421px] lg:h-[471px] w-full h-auto"
                style={{ backgroundColor: panelBgColor }}
              >
                <div>
                  <Text
                    title={s.title}
                    classes={{
                      container:
                        "text-white text-[24px] md:text-[28px] font-semibold tracking-[0] leading-none",
                    }}
                  />

                  <p
                    class="mt-4 text-white/90 text-[16px] leading-[140%] font-normal"
                    style={{ fontFamily: "Electrolux Sans, sans-serif" }}
                  >
                    {s.description}
                  </p>
                </div>

                <a
                  href={s.href}
                  class="mt-6 inline-block underline text-white text-[16px] leading-[140%]"
                  style={{ fontFamily: "Electrolux Sans, sans-serif" }}
                >
                  {s.ctaLabel ?? defaultCtaLabel}
                </a>
              </aside>
            </div>
          </div>
        </div>
      )),
    [slides, panelBgColor, defaultCtaLabel]
  );

  return (
    <div class="relative">
      {/* viewport do slider */}
      <div ref={viewportRef} class="overflow-hidden">
        <div
          ref={trackRef}
          class="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${-index * slideW}px)` }}
        >
          {slidesMarkup}
        </div>
      </div>

      {/* dots */}
      <div class="flex items-center justify-center lg:absolute lg:bottom-4 lg:mt-[0] mt-2 relative w-full">
        <div class="flex items-center justify-center gap-2 p-[7px] bg-white border rounded-[2000px] border-[#7A8A9C]">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir para o slide ${i + 1}`}
              class={`w-2.5 h-2.5 rounded-full ${
                i === index ? "bg-[#041E50]" : "bg-[#ADB9C3]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
