// sections/InspireTilesSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Electrolux Content-Hub • Inspire Tiles
 * @description Grid com imagens inteiras (sem crop). 2x2 no mobile, 4 colunas no desktop.
 * As imagens são configuradas separadamente para desktop e mobile.
 */
export interface InspireTilesSectionProps {
  section?: ISection;

  /** @title Imagens (Desktop) */
  desktopImages: IResponsiveImage[];

  /** @title Imagens (Mobile) */
  mobileImages: IResponsiveImage[];

  /** @title Cor de fundo dos tiles (aparece nas “bordas” do contain) @default #0F172A */
  cardBg?: string;

  /** @title Raio de borda (px) @default 6 */
  radius?: number;

  /** @title Espaçamento (px) @default 8 */
  gap?: number;
}

export default function InspireTilesSection({
  section,
  desktopImages = [],
  mobileImages = [],
  cardBg = "#0F172A",
  gap = 8,
}: InspireTilesSectionProps) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      {/* MOBILE (2 colunas) */}
      <div class="grid grid-cols-2 md:hidden" style={{ gap: `${gap}px` }}>
        {mobileImages.map((img, i) => (
          <div
            key={`m-${i}`}
            class={`w-full overflow-hidden`}
            style={{
              backgroundColor: cardBg,
            }}
          >
            <ResponsiveImage {...img} />
          </div>
        ))}
      </div>

      <div class="hidden md:grid md:grid-cols-4" style={{ gap: `${gap}px` }}>
        {desktopImages.map((img, i) => (
          <div
            key={`d-${i}`}
            class={`w-full overflow-hidden`}
            style={{
              backgroundColor: cardBg,
            }}
          >
            <ResponsiveImage {...img} />
          </div>
        ))}
      </div>
    </Section>
  );
}
