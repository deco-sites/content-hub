import { Text } from "@eluxlab/library-components";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import { useId } from "site/sdk/useId.ts";

interface Category {
  name?: string;
  image?: IResponsiveImage;
}

interface CategoriesGridSectionProps {
  section?: ISection;
  categories?: Category[];
}

export default function CategoriesGridSection({
  section,
  categories,
}: CategoriesGridSectionProps) {
  const id = useId();

  const allowedLengths = [3, 6];

  if (!categories || !allowedLengths.includes(categories.length)) {
    return '"CategoriesGridSection: é necessário adicionar 3 ou 6 items para que esta section seja renderizada."';
  }

  if (categories?.length === 3) {
    return (
      <Section {...section} id={id}>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              class="relative flex flex-col justify-end items-end text-right"
              key={index}
            >
              <ResponsiveImage {...category.image} />

              <div class="absolute bg-black/50 h-[130px] bottom-0 left-0 w-full flex items-end justify-end pointer-events-none">
                <Text
                  title={category.name ?? ""}
                  classes={{
                    container:
                      "text-white text-[24px] lg:text-[36px] font-semibold px-5 pb-6 leading-none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section {...section} id={id}>
      {categories?.length === 6 && (
        <>
          <div class="grid-category-container__mobile grid grid-cols-2 gap-[8px]">
            {categories?.map((category, index) => {
              return (
                <div
                  key={index}
                  class="grid-category-item__mobile relative flex flex-col justify-end items-end h-[191px]"
                >
                  <ResponsiveImage {...category.image} />
                  <div class="grid-category-item-overlay__mobile absolute inset-0 bg-black opacity-50" />
                  <Text
                    title={category.name ?? ""}
                    classes={{
                      container:
                        "grid-category-item-text__mobile absolute text-[#FFFFFF] font-semibold bottom-[8px] right-[12px]",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div class="grid-category-container__desktop">
            {categories?.slice(0, 6).map((category, index) => (
              <div
                class={`grid-category-item__desktop photo${index}`}
                key={index}
              >
                <ResponsiveImage {...category.image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <Text
                  title={category.name ?? ""}
                  classes={{ container: "grid-category-item-text__desktop" }}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <style>
        {`
          .grid-category-item__mobile img {
            height: 191px;
            width: 100%;
          }

          .grid-category-container__desktop {
            display: none;
          }
          
          @media screen and (min-width: 1024px) {
            .grid-category-container__mobile {
              display: none;
            }

            .grid-category-container__desktop {
              height: 670px;
              display: grid;
              gap: 8px;
              grid-template-areas:
                'photo0 photo0 photo1 photo1 photo2 photo2 photo3 photo3' 
                'photo0 photo0 photo4 photo4 photo4 photo5 photo5 photo5';
            }

            .grid-category-item__desktop {
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              align-items: flex-end;
            }

            .grid-category-item-overlay__desktop {
              position: absolute;
              background-color: #000000;
              opacity: 0.5;
              height: 120px;
              bottom: 0;
              left: 0;
              width: 100%;
            }

            .grid-category-item-text__desktop {
              position: absolute;
              color: #FFFFFF;
              font-size: 36px;
              font-weight: 600;
              bottom: 8px;
              right: 12px
            }
            
            .photo0 { grid-area: photo0; }
            .photo1 { grid-area: photo1; }
            .photo2 { grid-area: photo2; }
            .photo3 { grid-area: photo3; }
            .photo4 { grid-area: photo4; }
            .photo5 { grid-area: photo5; }

            .photo0 a,
            .photo1 a,
            .photo2 a,
            .photo3 a,
            .photo4 a,
            .photo5 a { 
              height: 100%; 
            }
          }
        `}
      </style>
    </Section>
  );
}
