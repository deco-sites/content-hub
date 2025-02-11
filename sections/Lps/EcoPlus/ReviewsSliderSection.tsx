import Section from "site/components/ui/Section.tsx";
import { FakeReviewCard } from "http://127.0.0.1:5500/dist/index.js";
import type { ISection } from "site/types/Section.d.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title {{#fakeProductName}}{{fakeProductName}} | {{fakePersonName}}{{/fakeProductName}}{{^fakeProductName}}Fake Review{{/fakeProductName}}
 */
interface IFakeReviewCard {
  /**
   * @title Estrelas da Avaliação
   * @description Define a quantidade e os ícones das estrelas (cheia, vazia e meio preenchida).
   */
  fakeStars: {
    /**
     * @title Quantidade de Estrelas
     * @description A quantidade total de estrelas a serem exibidas.
     * @default 5
     */
    quantity?: number;

    /**
     * @title Estrela Cheia (opcional)
     * @description O caminho da imagem do ícone para uma estrela cheia.
     * @default https://electrolux.vteximg.com.br/arquivos/fakereview-fullstar.svg
     */
    fullStarSrc?: string;

    /**
     * @title Estrela Vazia (opcional)
     * @description O caminho da imagem do ícone para uma estrela vazia.
     * @default https://electrolux.vteximg.com.br/arquivos/fakereview-emptystar.svg
     */
    emptyStarSrc?: string;

    /**
     * @title Estrela Meio Preenchida (opcional)
     * @description O caminho da imagem do ícone para uma estrela meio preenchida.
     * @default https://electrolux.vteximg.com.br/arquivos/fakereview-halfstar.svg
     */
    halfStarSrc?: string;
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

interface IBackground {
  /**
   * @title Imagem (desktop)
   * @format image-uri
   */
  srcDesktop: string;

  /**
   * @title Imagem (mobile)
   * @format image-uri
   */
  srcMobile: string;

  /**
   * @title Alt
   * @description Atributo de texto alternativo (SEO)
   */
  alt: string;
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
  background?: IBackground;

  /**
   * @title Cartões de Avaliação Falsos
   * @description Lista de cartões de avaliação fictícios, contendo informações sobre a avaliação e a imagem de estrelas associada.
   */
  fakeReviewCards?: IFakeReviewCard[];
}

export default function ReviewsSliderSection({
  section,
  background,
  fakeReviewCards = []
}: Props) {
  const { srcDesktop, srcMobile, alt } = background ?? {};

  return (
    <Section
      {...section}
      classesContainer="review-cards-section relative h-[350px] lg:h-[500px] bg-black bg-opacity-[0.7] bg-auto bg-blend-darken justify-center lg:gap-[32px]"
    >
      <>
        {srcDesktop && srcMobile && (
          <div class="flex absolute h-full top-0 left-0 -z-[1]">
            <picture class="flex w-full">
              <source srcSet={srcMobile} media="(max-width: 1024px)" />
              <Image
                alt={alt}
                class="w-full"
                height={440}
                src={srcDesktop}
                width={1920}
              />
            </picture>
          </div>
        )}

        <div class="flex w-full">
          <div class="flex w-full max-w-[1440px] mx-auto justify-center items-center lg:px-6">
            <div class="flex px-4 gap-2 w-full h-fit overflow-x-auto whitespace-nowrap [scrollbar-width:none] lg:justify-center lg:px-0 lg:gap-8 lg:whitespace-normal">
              {fakeReviewCards?.map((props, idx) => {
                return (
                  <FakeReviewCard
                    {...{
                      ...props,
                      classes: {
                        container:
                          "whitespace-normal min-w-[340px] lg:min-w-[initial]",
                        fakeDescription: "min-h-[60px]",
                        fakeProductNameAndPersonName: "min-h-[45px]"
                      }
                    }}
                    key={`${props.fakePersonName}-${idx}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <h2>loading...</h2>
    </div>
  );
}
