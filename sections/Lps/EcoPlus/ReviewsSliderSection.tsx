import Section from "site/components/ui/Section.tsx";
import { FakeReviewCard } from "http://127.0.0.1:5500/dist/index.js";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title {{#fakeProductName}}{{fakeProductName}} | {{fakeDescription}}{{/fakeProductName}}{{^fakeProductName}}Fake Review{{/fakeProductName}}
 */
interface IFakeReviewCard {
  /**
   * @title Estrelas da Avaliação
   * @description Define a quantidade e os ícones das estrelas (cheia, vazia e meio preenchida).
   */
  fakeStars: {
    quantity: number;
    fullStarSrc: string;
    emptyStarSrc: string;
    halfStarSrc: string;
  };

  /**
   * @title Descrição da Avaliação
   * @description Texto fictício da avaliação exibida no card.
   */
  fakeDescription: string;

  /**
   * @title Nome do Produto
   * @description Nome do produto associado à avaliação falsa.
   */
  fakeProductName: string;

  /**
   * @title Nome do Avaliador
   * @description Nome fictício da pessoa que escreveu a avaliação.
   */
  fakePersonName: string;

  /**
   * @hide
   */
  classes?: {
    container?: string;
    fakeStars?: string;
    fakeDescription?: string;
    fakeProductNameAndPersonName?: string;
  };

  /**
   * @hide
   */
  styles?: {
    container?: string;
    fakeStars?: string;
    fakeDescription?: string;
    fakeProductNameAndPersonName?: string;
  };
}

/**
 * @description Seção com reviews de clientes (fake).
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Imagem de Fundo
   * @description Define a imagem de fundo da seção de avaliações.
   * @format image-uri
   */
  background: string;

  /**
   * @title Estrelas da Avaliação
   * @description Define a quantidade e os ícones das estrelas (cheia, vazia e meio preenchida).
   */
  fakeStars: IFakeReviewCard[];
}

export default function ReviewsSliderSection({
  section,
  fakeStars = []
}: Props) {
  return (
    <Section {...section}>
      <div class="flex">
        {fakeStars?.map((props, idx) => {
          return (
            <FakeReviewCard {...props} key={`${props.fakePersonName}-${idx}`} />
          );
        })}
      </div>
    </Section>
  );
}
