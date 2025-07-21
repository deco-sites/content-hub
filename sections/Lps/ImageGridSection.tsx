import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title Section de Grid de Imagens Responsiva
 * @description Exibe 3 imagens alinhadas horizontalmente no desktop e verticalmente no mobile, sem quebra no desktop.
 */
export interface ImageGridSectionProps {
  section?: ISection;
  image1?: string;
  image2?: string;
  image3?: string;
}

export default function ImageGridSection(
  {
    section,
    imageCollection,
    image1,
    image2,
    image3,
  }: ImageGridSectionProps,
) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      <div class="w-full max-w-[1200px] mx-auto flex flex-wrap lg:flex-nowrap gap-4 justify-center items-center">
        <img
          src={image1}
          alt="Imagem 1"
          class="w-full sm:w-1/2 lg:w-1/3 max-w-[528px] h-auto"
        />
        <img
          src={image2}
          alt="Imagem 2"
          class="w-full sm:w-1/2 lg:w-1/3 max-w-[528px] h-auto"
        />
        <img
          src={image3}
          alt="Imagem 3"
          class="w-full sm:w-1/2 lg:w-1/3 max-w-[528px] h-auto"
        />
      </div>
    </Section>
  );
}
