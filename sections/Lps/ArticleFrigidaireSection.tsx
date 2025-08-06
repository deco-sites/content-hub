/** @title Seção Frigidaire de Cards com Imagem, Título e Texto */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

export interface CardItem {
  /** @title Imagem */
  image: {
    src: string;
    alt?: string;
  };

  /** @title Título do card */
  title: string;

  /** @title Descrição do card */
  description: string;
}

export interface Props {
  /** @title Configurações da seção */
  section?: ISection;

  /** @title Título principal da seção */
  heading?: string;

  /** @title Lista de Cards */
  cards?: CardItem[];
}

export default function ArticleFrigidaireSection({
  section,
  heading = "Título da seção",
  cards = [],
}: Props) {
  const id = useId();

  if (!cards.length) return null;

  return (
    <Section {...section} id={id} classesContainer="article-frigidaire-section">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto px-4">
        {cards.map((card, index) => (
          <div key={index} class="flex flex-col items-center text-center">
            <img
              src={card.image.src}
              alt={card.image.alt || "Imagem"}
              class="rounded-md mb-4 w-full h-auto object-cover"
              loading="lazy"
            />
            <h3 
             class="text-xl font-bold text-[#000000] mb-2"
             style="font-family: 'Gotham', sans-serif;"
             >
              {card.title}
            </h3>
            <p 
             class="text-sm text-[#4F4F4F]"
             style="font-family: 'Gotham', sans-serif;"
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
