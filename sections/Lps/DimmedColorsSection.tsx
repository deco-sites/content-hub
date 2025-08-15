import { useId } from "site/sdk/useId.ts";
import { dimmedColorsSectionData } from "site/configs/DimmedColorsSection.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import Section from "site/components/ui/Section.tsx";

/**
 * @title Cores
 * @description RGBA das cores para cada tipo de dispositivo
 */
type DimmedColors = {
  mobile?: string;
  desktop?: string;
};

/**
 * @title Card infromativo
 */
type DimmedColorsData = {
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
  color?: DimmedColors;
  image?: IResponsiveImage;
};

interface DimmedColorsSection {
  section?: ISection;
  /**
   * @title Lista de cards informativos
   */
  data?: DimmedColorsData[];
}

export default function DimmedColorsSection(
  {
    section,
    data = dimmedColorsSectionData
      .threeItemsData,
  }: DimmedColorsSection,
) {
  const id = useId();

  return (
    <Section
      {...section}
      id={id}
    >
      <div class="dimmed-colors-items__container flex flex-col justify-center items-center">
        {data.map(
          (item, index) => {
            return (
              <div class="dimmed-colors-item__container relative flex flex-col overflow-hidden h-[171px]">
                <a
                  href={item.link}
                  key={index}
                >
                  <ResponsiveImage
                    {...item.image}
                  />
                  <div
                    style={{
                      backgroundColor: item.color
                        .mobile,
                    }}
                    class="dimmed-colors-item__mobile absolute flex flex-col justify-center items-start h-full w-full pl-4 text-white"
                  >
                    <h3 class="dimmed-colors-item-title__mobile font-semibold">
                      {item.title}
                    </h3>
                    <p class="dimmed-colors-item-text__mobile">{item.text}</p>
                  </div>

                  <div
                    style={{
                      backgroundColor: item.color
                        .desktop,
                    }}
                    class="dimmed-colors-item__desktop absolute h-full w-full px-[24px] pt-[24px] text-white"
                  >
                    <h3 class="font-semibold">
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
          .dimmed-colors-item__mobile {
            display: flex;
          }

          .dimmed-colors-item-title__mobile {
            font-size: 26px;
            font-weight: 600;
            color: #FFFFFF;
          }

          .dimmed-colors-item-text__mobile {
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
          }

          .dimmed-colors-item__desktop {
            display: none;
          }

          @media screen and (min-width: 1024px) {
            .dimmed-colors-item__mobile {
              display: none;
            }

            .dimmed-colors-items__container {
              cursor: pointer;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              flex-direction: row;
              gap: 8px;
            }
            
            .dimmed-colors-item__container {
              height: 100%;
            }

            .dimmed-colors-item__desktop {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              position: static;
              height: 170px;
            }
          }
        `}
      </style>
    </Section>
  );
}
