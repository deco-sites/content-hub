import { Text } from "@eluxlab/library-components";
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

interface InspireImage {
  /**
   * @title Título Overlay
   * @description Cadastro do texto por cima do overlay
   */
  name?: string;
  image?: IResponsiveImage;
}

export interface InspireTilesSectionProps {
  section?: ISection;

  /**
   * @title Imagens
   * @description Os cadastros de desktop e mobile estão em cada item
   */
  InspireImages: InspireImage[];

  /** @title Cor de fundo dos tiles (aparece nas “bordas” do container) @default #0F172A */
  cardBg?: string;

  /** @title Raio de borda (px) @default 6 */
  radius?: number;

  /** @title Espaçamento (px) @default 8 */
  gap?: number;
}

export default function InspireTilesSection({
  section,
  InspireImages = [],
  cardBg = "#0F172A",
  radius = 8,
  gap = 8,
}: InspireTilesSectionProps) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      <div
        class="inspireTilesGrid grid grid-cols-2 md:grid-cols-4"
        style={{ gap: `${gap}px` }}
      >
        {InspireImages.map((img, i) => (
          <div
            key={`${img.image?.src ?? ""}-${i}`}
            class="inspireGridTile relative overflow-hidden object-contain h-auto"
            style={{
              backgroundColor: cardBg,
              borderRadius: `${radius}px`,
            }}
          >
            <ResponsiveImage {...img.image} />

            <div class="inspireOverlay absolute bottom-0 left-0 w-full lg:h-[164px] bg-black opacity-50" />

            <Text
              title={img.name ?? ""}
              classes={{
                container:
                  "inspireText absolute text-white font-semibold md:bottom-[34px] bottom-[8px] right-0 md:px-[21px] px-[12px] md:text-[36px] md:leading-[36px] text-[16px] leading-[16px] font-semibold break-words hyphens-auto",
              }}
            />
          </div>
        ))}
        <style>
          {`
          .inspireText,
          .inspireText > h1,
          .inspireText > h1 a,
          .inspireText > h2,
          .inspireText > h2 a,
          .inspireText > h3,
          .inspireText > h3 a,
          .inspireText > a {
            -ms-hyphens: auto;
            -moz-hyphens: auto;
            -webkit-hyphens: auto;
            hyphens: auto;
            overflow-wrap: break-word;
            word-break: break-word;
          }
        `}
        </style>
      </div>
    </Section>
  );
}
