import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Seção de Múltiplas Imagens
 * @description Exibe imagens lado a lado no desktop e empilhadas no mobile. Ideal para banners.
 */
interface Props {
  section?: ISection;

  /**
   * @title Imagens
   * @description Adicione 2 ou mais imagens para exibição na seção.
   */
  images?: IResponsiveImage[];
}

export default function MultiImageBannerSection({
  section,
  images = [],
}: Props) {
  const id = useId();

  if (!images.length) return null;

  return (
    <Section {...section} id={id}>
      <div class="flex flex-col md:flex-row flex-wrap justify-center gap-2 mx-auto">
        {images.map((image, index) => (
          <div key={index} class="w-full md:flex-1">
            <img
              src={image.src?.desktop ?? ""}
              alt={image.alt ?? `Imagem ${index + 1}`}
              class="w-full h-auto object-cover"
              loading={image.loadingOptions?.loading ?? "lazy"}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
