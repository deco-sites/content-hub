import Section from "site/components/ui/Section.tsx";
import Image from "apps/website/components/Image.tsx";
import { FakeReviewCard } from "@eluxlab/library-components";
import { useId } from "preact/hooks";
import type { ISection } from "site/types/Section.d.ts";
import type { IFakeReviewCard } from "site/types/FakeReviewCard.d.ts";

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
   * @description Define o título, subtítulo e espaçamento da seção.
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

export default function FakeReviewSection({
  section,
  background,
  fakeReviewCards = [],
}: Props) {
  const id = useId();
  const { srcDesktop, srcMobile, alt } = background ?? {};

  return (
    <Section
      id={id}
      {...section}
      classesContainer="fake-review-section relative h-[350px] lg:h-[500px] bg-black bg-opacity-[0.7] bg-auto bg-blend-darken justify-center lg:gap-[32px]"
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
                        fakeProductNameAndPersonName: "min-h-[45px]",
                      },
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
    <div style={{ height: "500px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
