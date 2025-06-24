import { Text } from "@eluxlab/library-components";
import { dimmedColorsSectionData } from "site/configs/DimmedColorsSection.ts";
import type { IResponsiveImage } from "site/types/Article.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";

type DimmedColors = {
  mobile?: string;
  desktop?: string;
};

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
    <Section id="dimmed-colors" title={''}>
      <div class="flex flex-col text-center pt-[1rem]">
        <h1 id="dimmed-colors__title">{title}</h1>
        <p id="dimmed-colors__text" class="px-3 pb-3 text-center">{text}</p>
        <div id="dimmed-colors-items__container" class="flex flex-col">
          {data.map(
            (item, index) => {
              return (
                <a href={item.link} key={index}>
                  <div
                    id="dimmed-colors-item__container"
                    class="relative flex flex-col overflow-hidden"
                  >
                    <ResponsiveImage {...item.image} />
                    <div
                      id="dimmed-colors-item__mobile"
                      style={{ backgroundColor: item.color.mobile }}
                      class="absolute flex flex-col justify-center items-start h-full w-full pl-4 text-white"
                    >
                      <h3 class="font-semibold">{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    <div
                      id="dimmed-colors-item__desktop"
                      style={{ backgroundColor: item.color.desktop }}
                      class="absolute flex flex-col justify-center items-start h-full w-full pl-4 text-white"
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
      </div>
      <style>
        {`
          #section-dimmed-colors {
            justify-content: center; 
            align-items: center;
          }

          #section-dimmed-colors > .section-title {
            text-align: center;
            font-size: 36px;
            font-weight: 600;
            color: #041E50;
            padding-bottom: 0.75rem; 
          }

          #dimmed-colors__title {
            text-align: center;
            font-size: 36px;
            font-weight: 600;
            color: #041E50;
            padding-bottom: 0.75rem; 
          }

          #dimmed-colors__text {
            text-align: center;
            font-size: 22px;
            font-weight: 400;
            color: #041E50;
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
              justify-content: flex-start;
              padding-top: 2vh;
              position: static;
              height: 12vh;
            }
          }
        `}
      </style>
    </Section>
  );
}
