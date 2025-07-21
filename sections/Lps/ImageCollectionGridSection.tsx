import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Section de Grid de Imagens Responsiva
 * @description Exibe 3 imagens alinhadas horizontalmente no desktop e verticalmente no mobile, sem quebra no desktop.
 */
export interface ImageGridSectionProps {
  section?: ISection;
  /**
  * @title Coleção de Imagens
  * @description Aqui, são colocadas todas as imagens da seção.
  */
  imageCollection?: IResponsiveImage[];
}

export default function ImageGridSection(
  {
    section,
    imageCollection,
  }: ImageGridSectionProps,
) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      {imageCollection.length === 1 ? (
        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-1 justify-center items-center" >
          {imageCollection.map((image, index) => (
            <ResponsiveImage src={image.src} key={index} />
          ))}
        </div>
      ) : imageCollection.length === 2 ? (
        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-2 justify-center items-center gap-x-[8px]">
          {imageCollection.map((image, index) => (
            <ResponsiveImage src={image.src} key={index} />
          ))}
        </div>
      ) : imageCollection.length === 3 ? (
        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 justify-center items-center gap-x-[8px]">
          {imageCollection.map((image, index) => (
            <ResponsiveImage src={image.src} key={index} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}