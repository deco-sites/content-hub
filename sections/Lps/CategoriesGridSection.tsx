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

export default function CategoriesGridSection(
  { section, categories }: CategoriesGridSectionProps,
) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      {categories.length === 6
        ? (
          <>
            <div class="grid-category-container__mobile grid grid-cols-2 gap-[8px]">
              {categories.map((category, index) => {
                return (
                  <div class="grid-category-item__mobile relative flex flex-col justify-end items-end h-[191px]">
                    <ResponsiveImage {...category.image} />
                    <div class="grid-category-item-overlay__mobile absolute bg-black inset-0 bg-black opacity-50">
                    </div>
                    <span class="grid-category-item-text__mobile absolute text-[#FFFFFF] font-semibold bottom-[8px] right-[12px]">
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>
            <div class="grid-category-container__desktop">
              <div class="grid-category-item__desktop grid-desktop-index-0">
                <ResponsiveImage {...categories[0].image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <span class="grid-category-item-text__desktop">
                  {categories[0].name}
                </span>
              </div>
              <div class="grid-category-item__desktop grid-desktop-index-1">
                <ResponsiveImage {...categories[1].image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <span class="grid-category-item-text__desktop">
                  {categories[1].name}
                </span>
              </div>
              <div class="grid-category-item__desktop grid-desktop-index-2">
                <ResponsiveImage {...categories[2].image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <span class="grid-category-item-text__desktop">
                  {categories[2].name}
                </span>
              </div>
              <div class="grid-category-item__desktop grid-desktop-index-3">
                <ResponsiveImage {...categories[3].image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <span class="grid-category-item-text__desktop">
                  {categories[3].name}
                </span>
              </div>
              <div class="grid-category-item__desktop grid-desktop-index-4">
                <ResponsiveImage {...categories[4].image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <span class="grid-category-item-text__desktop">
                  {categories[4].name}
                </span>
              </div>
              <div class="grid-category-item__desktop grid-desktop-index-5">
                <ResponsiveImage {...categories[5].image} />
                <div class="grid-category-item-overlay__desktop"></div>
                <span class="grid-category-item-text__desktop">
                  {categories[5].name}
                </span>
              </div>
            </div>
          </>
        )
        : "CategoriesGridSection: é necessário adicionar 6 items para que esta section seja renderizada."}
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
              display: grid;
              grid-template-areas: 
                "index-0 index-1 index-2 index-3"
                "index-0 index-4 index-4 index-5";
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
              inset: 0;
              opacity: 0.5;
            }

            .grid-category-item-text__desktop {
              position: absolute;
              color: #FFFFFF;
              font-weight: 600;
              bottom: 8px;
              right: 12px
            }
            
            .grid-desktop-index-0 { grid-area: index-0; }
            .grid-desktop-index-1 { grid-area: index-1; }
            .grid-desktop-index-2 { grid-area: index-2; }
            .grid-desktop-index-3 { grid-area: index-3; }
            .grid-desktop-index-4 { grid-area: index-4; }
            .grid-desktop-index-5 { grid-area: index-5; }
          }
        `}
      </style>
    </Section>
  );
}
