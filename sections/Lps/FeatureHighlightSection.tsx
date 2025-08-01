/** @title Seção de Destaques com Imagem + Texto */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

interface Props {
  section?: ISection;

  /**
   * @title Imagem superior (pão)
   * @format image-uri
   */
  topImage?: string;

  /**
   * @title Texto abaixo da imagem superior
   * @default Cocción a Vapor que mejora hasta 2x los resultados de la masa haciéndola mucho más crocante.
   */
  highlightText?: string;

  /**
   * @title Imagem do fogão
   * @format image-uri
   */
  stoveImage?: string;

  /**
   * @title Título do bloco de fogão
   * @default Vapor Regenerativo
   */
  stoveTitle?: string;

  /**
   * @title Descrição do bloco de fogão
   * @default Conserva el sabor y el aroma de tus recetas gracias al vapor regenerativo, evitando que los alimentos se resequen
   */
  stoveDescription?: string;
}

export default function FeatureHighlightSection({
  section,
  topImage,
  highlightText = "Cocción a Vapor que mejora hasta 2x los resultados de la masa haciéndola mucho más crocante.",
  stoveImage,
  stoveTitle = "Vapor Regenerativo",
  stoveDescription = "Conserva el sabor y el aroma de tus recetas gracias al vapor regenerativo, evitando que los alimentos se resequen",
}: Props) {
  const id = useId();

  return (
    <Section {...section} id={id} classesContainer="feature-highlight-section">
      <div class="w-full bg-white text-center flex flex-col items-center px-4 ">

        {/* Bloco do pão */}
        {topImage && (
          <img src={topImage} alt="Imagem superior" class="w-full max-w-5xl rounded-lg shadow-md" loading="lazy" />
        )}

        <div class="relative w-full flex justify-center">
            <div
                class="bg-white shadow-md rounded-lg px-6 py-4 max-w-xl z-20 absolute"
                style={{ bottom: "-30px" }}
            >
                <p class="text-lg font-medium text-gray-700">{highlightText}</p>
            </div>
        </div>


        {/* Bloco do fogão */}
        <div class="relative w-full bg-[#FF405A] max-w-5xl">
          {stoveImage && (
            <img
              src={stoveImage}
              alt="Fogão"
              class="mx-auto w-full max-w-3xl z-20 relative"
              style={{ position: "relative", zIndex: 20 }}
              loading="lazy"
            />
          )}

          <div class="bg-white px-6 py-20 shadow-lg rounded-lg mt-[-80px] z-10 relative max-w-xl mx-auto">
            <h3 class="text-xl font-bold text-[#FF405A] mb-2">{stoveTitle}</h3>
            <p class="text-gray-700 text-base">{stoveDescription}</p>
          </div>

          <div class="bg-white px-6 py-20 shadow-lg rounded-lg mt-[-80px] z-10 relative max-w-xl mx-auto">
            <h3 class="text-xl font-bold text-[#FF405A] mb-2">{stoveTitle}</h3>
            <p class="text-gray-700 text-base">{stoveDescription}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
