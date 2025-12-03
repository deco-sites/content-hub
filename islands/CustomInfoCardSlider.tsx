import { useEffect, useMemo, useState } from "preact/hooks";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  infoCards?: IInfoCardCustom[];
  rootId: string;
  configs?: ISliderConfigs;
  onRegisterControls?: (controls: {
    prev: () => void;
    next: () => void;
    setPage?: (p: number) => void;
    getPage?: () => number;
    totalPages?: number;
  }) => void;
  teste?: string;
}

/** Tipos seguros para usar globalThis sem 'window' */
type GlobalWithResize = {
  innerWidth?: number;
  addEventListener?: (type: "resize", listener: EventListener) => void;
  removeEventListener?: (type: "resize", listener: EventListener) => void;
};

const getGlobal = (): GlobalWithResize =>
  (globalThis as unknown as GlobalWithResize) ?? {};

/** Largura da janela (ou 0 no SSR) */
const getInnerWidth = (): number => {
  const g = getGlobal();
  return typeof g.innerWidth === "number" ? g.innerWidth : 0;
};

/** Adiciona listener de resize de forma tipada e retorna o remover */
const addResizeListener = (
  handler: EventListener,
): (() => void) | undefined => {
  const g = getGlobal();
  const add = g.addEventListener;
  const remove = g.removeEventListener;

  if (typeof add === "function" && typeof remove === "function") {
    // chama preservando o 'this'
    add.call(g, "resize", handler);
    return () => remove.call(g, "resize", handler);
  }
  return undefined;
};

/** Resolve slidesPerView conforme seus breakpoints */
function resolveSlidesPerView(cfg?: ISliderConfigs) {
  const base = Math.max(
    1,
    cfg?.slidesPerView ?? cfg?.slidesPerViewResponsive?.mobile ?? 1,
  );

  const get = () => {
    const w = getInnerWidth();
    if (w >= 1024) {
      return Math.max(1, cfg?.slidesPerViewResponsive?.desktop ?? base);
    }
    if (w >= 768) {
      return Math.max(1, cfg?.slidesPerViewResponsive?.tablet ?? base);
    }
    return Math.max(1, cfg?.slidesPerViewResponsive?.mobile ?? base);
  };

  const isDesktop = () => getInnerWidth() >= 1024;
  const isMobile = () => getInnerWidth() < 1024;

  return { get, isDesktop, isMobile };
}

/** Tipos auxiliares para o conteúdo de mídia */
type MediaContent = { src?: string; srcDesktop?: string; alt?: string };

export default function CustomInfoCardSlider({
  infoCards = [],
  rootId,
  configs,
  onRegisterControls,
}: Props) {
  const { get, isDesktop, isMobile } = resolveSlidesPerView(configs);

  const [spv, setSpv] = useState<number>(get());
  const [page, setPage] = useState<number>(0);

  const gap = Math.max(0, configs?.spaceBetween ?? 0);
  const speed = Math.max(0, configs?.speed ?? 300);

  const len = Math.max(1, infoCards.length);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(len / Math.max(1, spv))),
    [len, spv],
  );

  // Resize (corrige: handler aceita arg opcional; podemos chamar sem args)
  useEffect(() => {
    const onResize = (_evt?: Event) => {
      const v = get();
      setSpv(v);
      setPage((p: number) => Math.min(p, Math.max(0, Math.ceil(len / v) - 1)));
    };
    onResize();
    return addResizeListener(onResize as EventListener);
  }, [get, len]);

  // Autoplay
  useEffect(() => {
    if (!configs?.autoplay?.enabled) return;
    const delay = Math.max(1000, configs?.autoplay?.delay ?? 5000);
    const id = setInterval(() => {
      setPage((p: number) => {
        const next = p + 1;
        if (next < totalPages) return next;
        return configs?.loop ? 0 : p;
      });
    }, delay);
    return () => clearInterval(id);
  }, [
    configs?.autoplay?.enabled,
    configs?.autoplay?.delay,
    configs?.loop,
    totalPages,
  ]);

  const prev = () =>
    setPage((
      p: number,
    ) => (p > 0 ? p - 1 : (configs?.loop ? totalPages - 1 : 0)));

  const next = () =>
    setPage((p: number) => {
      const n = p + 1;
      return n < totalPages ? n : (configs?.loop ? 0 : p);
    });

  useEffect(() => {
    if (typeof onRegisterControls === "function") {
      onRegisterControls({
        prev,
        next,
        setPage: (p: number) => setPage(p),
        getPage: () => page,
        totalPages,
      });
    }
   
  }, [onRegisterControls, prev, next, page, totalPages]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const rootEl = document.getElementById(rootId);

    const onDocClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLElement>("[data-slider-target][data-slider-action]");
      if (!btn) return;
      const t = btn.dataset.sliderTarget;
      if (!t || t !== rootId) return;
      const act = btn.dataset.sliderAction;
      if (act === "prev") {
        prev();
      } else if (act === "next") {
        next();
      } else if (act === "set-page") {
        const p = Number(btn.dataset.sliderPage ?? "");
        if (!Number.isNaN(p)) setPage(p);
      }
    };

    const onCustom = (e: Event) => {
      const ev = e as CustomEvent;
      const detail = ev?.detail as Record<string, unknown> | undefined;
      if (!detail) return;
      if (detail.action === "prev") prev();
      else if (detail.action === "next") next();
      else if (detail.action === "set-page" && typeof detail.page === "number") setPage(detail.page);
    };

    document.addEventListener("click", onDocClick);
    rootEl?.addEventListener("custom-slider", onCustom as EventListener);
    return () => {
      document.removeEventListener("click", onDocClick);
      rootEl?.removeEventListener("custom-slider", onCustom as EventListener);
    };
  }, [rootId, prev, next]);

  const itemWidthPct = 100 / Math.max(1, spv);

  const showNav =
    (!!configs?.customNavigation?.enabledDesktop && isDesktop()) ||
    (!!configs?.customNavigation?.enabledMobile && isMobile());

  const showPag =
    (!!configs?.customPagination?.enabledDesktop && isDesktop()) ||
    (!!configs?.customPagination?.enabledMobile && isMobile());

  const hasItems = infoCards.length > 0;

  return (
    <div id={rootId} class="relative w-full">
      {/* Arrows */}
      {showNav && totalPages > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={prev}
            class="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full border bg-white hover:bg-gray-50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próximo"
            onClick={next}
            class="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full border bg-white hover:bg-gray-50"
          >
            ›
          </button>
        </>
      )}

      {/* Viewport */}
      <div class="w-full overflow-hidden">
        {/* Track */}
        <div
          class="flex ease-out"
          style={{
            transitionProperty: "transform",
            transitionDuration: `${speed}ms`,
            transform: `translateX(-${page * 100}%)`,
          }}
        >
          {hasItems &&
            infoCards.map((card, index) => {
              const tc = card.typeOfContent as MediaContent | undefined;
              const videoSrc = tc?.src && tc.src.endsWith(".mp4")
                ? tc.src
                : undefined;
              const imgSrc = tc?.srcDesktop;
              const imgAlt = tc?.alt ?? "Imagem";

              return (
                <div
                  key={index}
                  class="h-[453px] flex items-stretch"
                  style={{
                    flex: `0 0 ${itemWidthPct}%`,
                    paddingLeft: `${gap / 2}px`,
                    paddingRight: `${gap / 2}px`,
                  }}
                >
                  {/* 50/50 em lg */}
                  <div
                    class={`flex w-full h-full items-center justify-between ${card.direction === "left"
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                      } flex-col`}
                  >
                    {/* Mídia */}
                    <div class="w-full lg:w-1/2 h-full flex justify-center items-center">
                      {videoSrc
                        ? (
                          <video
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            class="w-full h-full object-cover"
                          />
                        )
                        : imgSrc
                          ? (
                            <img
                              src={imgSrc}
                              alt={imgAlt}
                              class="w-full h-full object-cover"
                              loading={configs?.lazy ? "lazy" : "eager"}
                            />
                          )
                          : <div class="w-full h-full bg-gray-200" />}
                    </div>

                    {/* Texto */}
                    <div
                      class="w-full lg:w-1/2 h-full p-6 pl-0 mt-2 lg:p-10 flex flex-col justify-center"
                      style={{
                        backgroundColor: card.textBackgroundColor ?? "#FFFFFF",
                        fontFamily: card.fontFamily ?? "Arial",
                      }}
                    >
                      {card.title && (
                        <h2 class="mb-4 font-bold text-[#041E50] text-[20px] lg:text-[26px]">
                          {card.title}
                        </h2>
                      )}

                      {card.description && (
                        <p class="font-normal text-[#2B2936] text-[14px] lg:text-[16px]">
                          {card.description}
                        </p>
                      )}

                      {card.link?.href && (
                        <div class="mt-6">
                          <a
                            href={card.link.href}
                            class="inline-block font-semibold "
                          >
                            {card.link.text ?? "Saiba mais"}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Dots */}
      {showPag && totalPages > 1 && (
        <div class="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para página ${i + 1}`}
              class={`w-2.5 h-2.5 rounded-full border ${i === page
                ? "bg-gray-800 border-gray-800"
                : "bg-transparent border-gray-400"
                }`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
