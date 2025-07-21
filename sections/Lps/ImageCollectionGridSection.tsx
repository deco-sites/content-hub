import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Section com uma coleção de imagens responsivas em grid.
 * @description Exibe de 1 a 3 imagens alinhadas horizontalmente no desktop e verticalmente no mobile.
 */
export interface ImageCollectionGridSectionProps {
  section?: ISection;
  /**
  * @title Coleção de Imagens
  * @description Todas as imagens da seção devem ser colocadas aqui em sequência.
  */
  imageCollection?: IResponsiveImage[];
}

export default function ImageCollectionGridSection(
  {
    section,
    imageCollection,
  }: ImageCollectionGridSectionProps,
) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      {imageCollection.length === 1 ? (
        <div class="w-full grid sm:grid-cols-1 lg:grid-cols-1 justify-center items-center" >
          {imageCollection.map((image, index) => (
            <ResponsiveImage src={image.src} key={index} />
          ))}
        </div>
      ) : imageCollection.length === 2 ? (
        <div class="w-full grid sm:grid-cols-1 lg:grid-cols-2 justify-center items-center gap-y-[8px] gap-x-[8px]">
          {imageCollection.map((image, index) => (
            <ResponsiveImage src={image.src} key={index} />
          ))}
        </div>
      ) : imageCollection.length === 3 ? (
        <div class="w-full grid sm:grid-cols-1 lg:grid-cols-3 justify-center items-center gap-y-[8px] gap-x-[8px]">
          {imageCollection.map((image, index) => (
            <ResponsiveImage src={image.src} key={index} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}