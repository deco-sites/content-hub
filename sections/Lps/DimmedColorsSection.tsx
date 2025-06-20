import { Text } from "@eluxlab/library-components";
import { dimmedColorsSectionData } from "site/configs/DimmedColorsSection.ts";
import type { IResponsiveImage } from "site/types/Article.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";

type DimmedColors = {
  mobile?: string;
  desktop?: string;
}

type DimmedColorsData = {
  title?: string;
  text?: string;
  link?: string;
  color?: DimmedColors;
  image?: IResponsiveImage;
};

interface DimmedColorsSection {
  title: string;
  text: string;
  data?: DimmedColorsData[];
}

export default function DimmedColorsSection(
  {
    title = dimmedColorsSectionData.title,
    text = dimmedColorsSectionData.text,
    data = dimmedColorsSectionData.threeItemsData,
  }: DimmedColorsSection,
) {
  return (
    <Section id="dimmed-colors" title="">
      <div class="flex flex-col text-center">
        <Text
          title={title}
          classes={{ container: "section-title" }}
          class="pb-3"
        />
        <p class="px-3 pb-3">{text}</p>
        <div id="dimmed-colors-items__container" class="flex flex-col">
          {data.map(
            (item, index) => {
              return (
                <a href={item.link}>
                  <div
                    id="dimmed-colors-item__container"
                    class="relative flex flex-col overflow-hidden"
                  >
                    <ResponsiveImage {...item.image} />
                    <div
                      id="dimmed-colors-item__mobile"
                      class="absolute flex flex-col justify-center items-start h-full w-full pl-4 text-white"
                      style={{ backgroundColor: item.color.mobile }}
                    >
                      <h3 class="font-semibold">{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    <div
                      id="dimmed-colors-item__desktop"
                      class="absolute flex flex-col justify-center items-start h-full w-full pl-4 text-white"
                      style={{ backgroundColor: item.color.desktop }}
                    >
                      <h3 class="font-semibold">{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </a>
              );
            },
          )}
        </div>
      </div >
      <style>
        {`
          #section-dimmed-colors > div {
            justify-content: center;
          }

          #dimmed-colors-item__mobile {
            display: flex;
          }

          #dimmed-colors-item__desktop {
            display: none;
          }

          @media screen and (min-width:1024px) {
            #dimmed-colors-items__container {
              flex-direction: row;
              gap: 0.25rem;
            }

            #dimmed-colors-item__mobile {
              display: none;
            }

            #dimmed-colors-item__desktop {
              display: flex;
              top: 50%;
              height: 50%;
            }
          }
        `}
      </style>
    </Section >
  );
}
