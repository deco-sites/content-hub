import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

interface Card {
  /**
   * @title Imagem
   */
  image: IResponsiveImage;

  /**
   * @title Tag
   */
  tag: string;

  /**
   * @title Título
   */
  title: string;

  /**
   * @title Descrição
   */
  description: string;

  /**
   * @title Link
   */
  linkText: string;

  /**
   * @title URL do Link
   */
  linkUrl: string;
}

/**
 * @title Grid de Cards com Imagem e Texto
 * @description Exibe uma grade de cards com imagem e textos editáveis.
 */
interface Props {
  section?: ISection;

  /**
   * @title Cards
   * @description Adicione de 1 a 3 cards com imagem e conteúdo.
   */
  cards?: Card[];
}

export default function ImageTextCardGridSection({
  section,
  cards = [],
}: Props) {
  const id = useId();

  if (!cards.length) return null;

  return (
    <Section {...section} id={id}>
      <div class="w-full max-w-[1200px] mx-auto flex flex-wrap lg:flex-nowrap gap-4 justify-center items-stretch px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            class="w-full sm:w-1/2 lg:w-1/3 max-w-[528px] bg-white shadow-md rounded overflow-hidden flex flex-col"
          >
            <img
              src={card.image?.src?.desktop ?? ""}
              alt={card.image?.alt ?? `Card ${index + 1}`}
              class="w-full h-auto object-cover"
              loading={card.image.loadingOptions?.loading ?? "lazy"}
            />
            <div class="bg-[#001E50] text-white p-4 flex flex-col gap-2 min-h-[160px]">
              <span class="text-sm uppercase opacity-60">{card.tag}</span>
              <h3 class="text-lg font-semibold">{card.title}</h3>
              <p class="text-sm">{card.description}</p>
              {card.linkUrl && (
                <a
                  href={card.linkUrl}
                  target="_blank"
                  class="text-[#FFFFFF] underline text-sm mt-2"
                >
                  {card.linkText || "Saiba mais"}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
