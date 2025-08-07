import { useId } from "site/sdk/useId.ts";
import { dimmedColorsSectionData } from "site/configs/DimmedColorsSection.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";

/**
 * @title Cores
 * @description Hexadecimal das cores para cada tipo de dispositivo
 */
type SolidColors = {
  /**
   * @title Mobile
   */
  mobile?: string;
  /**
   * @title Desktop
   */
  desktop?: string;
};

/**
 * @title Card informativo
 */
type SolidColorsData = {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Texto
   */
  text?: string;
  /**
  * @title Link
  */
  link?: string;
  /**
  * @title Cor
  */
  color?: SolidColors;
  /**
  * @title Imagem
  */
  image?: IResponsiveImage;
};

interface SolidColorsSection {
  section?: ISection;
  /**
  * @title Lista de cards informativos
  */
  data?: SolidColorsData[];
}

export default function SolidColorsSection(
  {
    section,
    data = dimmedColorsSectionData.threeItemsData,
  }: SolidColorsSection,
) {
  const id = useId();

  return (
    <Section
      {...section}
      id={id}
    >
      <div id="solid-colors-container" class="flex flex-col lg:flex-row justify-center items-center w-full gap-y-[12px] lg:gap-x-[12px]">
        {data.map(
          (item, index) => {
            return (
              <div
                key={index}
                class="flex flex-col overflow-hidden min-w-[294px] w-full"
              >
                <a
                  href={item.link}
                >
                  <div class="solid-color-image-container">
                    <ResponsiveImage
                      {...item.image}
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: item.color
                        .desktop,
                    }}
                    class="flex flex-col justify-start items-start h-[170px] w-full px-[24px] pt-[24px] text-white"
                  >
                    <h3 class="font-semibold text-[26px]">
                      {item.title}
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </a>
              </div>
            );
          },
        )}
      </div>
      <style>
        {`
          @media screen and (min-width: 1280px) {
            .solid-color-image-container img {
              width: 100%;
              height: 240px;
            }
            
            #solid-colors-container {
              max-width: 1200px;
            }
          }
          
          @media screen and (min-width: 1440px) {
            #solid-colors-container {
              max-width: 1360px;
            }
          }
          
          @media screen and (min-width: 1920px) {
            #solid-colors-container {
              max-width: 1600px;
            }
          }
        `}
      </style>
    </Section>
  );
}