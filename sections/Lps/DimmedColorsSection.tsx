// sections/DimmedColorsSection.tsx
import { useId } from "site/sdk/useId.ts";
import { dimmedColorsSectionData } from "site/configs/DimmedColorsSection.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";

/**
 * @title Cores
 * @description RGBA das cores para cada tipo de dispositivo
 */
type DimmedColors = {
  /** @title Mobile (RGBA) */
  mobile?: string;
  /** @title Desktop (RGBA) */
  desktop?: string;
};

/**
 * @title Card informativo
 */
type DimmedColorsItem = {
  /** @title Título */
  title?: string;
  /** @title Texto */
  text?: string;

  /** @title Link do Card (fallback do CTA se o CTA não for preenchido) */
  link?: string;

  /** @title Cores do overlay */
  color?: DimmedColors;

  /** @title Imagem */
  image?: IResponsiveImage;

  /** @title (CTA) Texto do link */
  ctaLabel?: string;

  /** @title (CTA) URL do link */
  ctaHref?: string;
};

interface DimmedColorsSectionProps {
  /** @title Configurações da seção */
  section?: ISection;

  /** @title Lista de cards informativos */
  data?: DimmedColorsItem[];
}

export default function DimmedColorsSection({
  section,
  // mantém o default atual do projeto
  data = dimmedColorsSectionData?.threeItemsData ?? [],
}: DimmedColorsSectionProps) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      <div class="dimmed-colors-items__container flex flex-col justify-center items-center lg:flex-row lg:items-start lg:justify-start lg:gap-2">
        {data?.map((item, index) => {
          const key = `${id}-${index}`;
          const overlayMobile = item?.color?.mobile ?? "rgba(0,0,0,0.6)";
          const overlayDesktop = item?.color?.desktop ?? "rgba(0,0,0,0.6)";

          // CTA configurável; se não vier, usa link do card; se nada vier, '#'
          const ctaHref = item?.ctaHref || item?.link || "#";
          const ctaLabel = item?.ctaLabel || "Conheça";

          return (
            <div
              key={key}
              class="dimmed-colors-item__container relative flex flex-col overflow-hidden h-[171px] w-full lg:w-auto"
            >
              {/* Imagem base */}
              {item?.image && <ResponsiveImage {...item} {...item.image} />}

              {/* OVERLAY MOBILE (com marca d’água da própria imagem) */}
              <div
                style={{ backgroundColor: overlayMobile }}
                class="dimmed-colors-item__mobile absolute inset-0 flex flex-col justify-center items-start h-full w-full pl-4 pr-6 text-white z-[1]"
              >
                {/* Marca d’água: mesma imagem do admin, por baixo do conteúdo */}
                {item?.image && (
                  <div class="watermark absolute inset-0 pointer-events-none -z-[1]">
                    <ResponsiveImage {...item} {...item.image} />
                  </div>
                )}

                {item?.title && (
                  <h3 class="dimmed-colors-item-title__mobile font-semibold text-[26px] leading-tight">
                    {item.title}
                  </h3>
                )}

                {item?.text && (
                  <p class="dimmed-colors-item-text__mobile text-[16px] mt-1">
                    {item.text}
                  </p>
                )}

                {/* CTA sublinhado */}
                <a
                  href={ctaHref}
                  class="mt-3 underline underline-offset-4 text-white"
                >
                  {ctaLabel}
                </a>
              </div>

              {/* OVERLAY DESKTOP */}
              <div
                style={{ backgroundColor: overlayDesktop }}
                class="dimmed-colors-item__desktop hidden lg:flex lg:flex-col lg:justify-start lg:items-start lg:static lg:h-[170px] lg:w-full lg:px-6 lg:pt-6 text-white"
              >
                {item?.title && (
                  <h3 class="font-semibold text-[26px] leading-tight">
                    {item.title}
                  </h3>
                )}

                {item?.text && <p class="text-[16px] mt-1">{item.text}</p>}

                <a
                  href={ctaHref}
                  class="mt-3 underline underline-offset-4 text-white"
                >
                  {ctaLabel}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estilos auxiliares mínimos: visibilidade por breakpoint e marca d’água */}
      <style>
        {`
          /* Mobile first */
          .dimmed-colors-item__mobile { display: flex; }
          .dimmed-colors-item__desktop { display: none; }

          /* Marca d’água no mobile (imagem por baixo do overlay) */
          .dimmed-colors-item__mobile .watermark img,
          .dimmed-colors-item__mobile .watermark picture img {
            opacity: 0.22;         /* ajuste fino do “fundo d’água” */
            filter: saturate(0.85); /* opcional: reduz levemente a saturação */
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
          }

          @media screen and (min-width: 1024px) {
            .dimmed-colors-item__mobile { display: none; }
            .dimmed-colors-item__desktop { display: flex; }
            .dimmed-colors-item__container { height: 100%; }
          }
        `}
      </style>
    </Section>
  );
}
