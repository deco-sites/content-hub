import Section from "site/components/ui/Section.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import { ReviewCards } from "@eluxlab/library-components";
import { useId } from "preact/hooks";
import type { IReviewCard } from "site/types/ReviewCard.d.ts";
import type { ISection } from "site/types/Section.d.ts";

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
 * @description Seção com reviews de clientes.
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
  sectionReviewCards?: IReviewCard[];
}

export default function ReviewsSliderSection({
  section,
  background,
  sectionReviewCards = []
}: Props) {
  const id = useId();
  const { srcDesktop, srcMobile, alt } = background ?? {};
  const { fullWidth = true } = section ?? {};

  return (
    <>
      <Section
        id={id}
        {...section}
        fullWidth={fullWidth}
        classesContainer="review-section w-full relative h-[350px] lg:h-[500px] bg-black bg-opacity-[0.7] justify-center xl:gap-[24px]"
      >
        <div className="w-full">
          {srcDesktop && srcMobile && (
            <div class="flex absolute h-full top-0 left-0 -z-[1]">
              <ResponsiveImage
                src={{ desktop: srcDesktop, mobile: srcMobile }}
                alt={alt}
                sizes={{
                  heightMobile: 350
                }}
              />
            </div>
          )}

          <div class="flex w-full">
            <div class="flex w-full mx-auto justify-center items-center lg:container">
              <div class="flex px-4 gap-2 w-full h-fit overflow-x-auto whitespace-nowrap [scrollbar-width:none] lg:justify-center lg:px-0 xl:gap-8 lg:whitespace-normal">
                {sectionReviewCards?.map((props, idx) => {
                  return (
                    <ReviewCards
                      {...{
                        ...props,
                        styles: {
                          container: {
                            maxWidth: "initial"
                          }
                        },
                        classes: {
                          container:
                            "whitespace-normal min-w-[340px] lg:min-w-[initial]",
                          reviewDescription: "min-h-[60px]",
                          reviewProductNameAndPersonName: "min-h-[45px]"
                        }
                      }}
                      key={`${props.reviewPersonName}-${idx}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[382px] lg:h-[552px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
