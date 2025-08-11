import { Text } from "@eluxlab/library-components";
import { isEmptyText } from "site/utils/text.ts";
import type { ISection } from "site/types/Section.d.ts";

interface SectionProps extends ISection {
  id: string;
}

export default function Section({
  id,
  children,
  title = "",
  subtitle = "",
  marginBottomMobile = 32,
  marginBottomDesktop = 52,
  marginTopMobile = 0,
  marginTopDesktop = 0,
  classesContainer,
  stylesContainer = {},
  fullWidth = false,
}: SectionProps) {
  return (
    <>
      <div
        id={`section-${id}`}
        class={`section-container flex flex-col w-full ${classesContainer ?? ""
          } ${!fullWidth ? "container" : ""}`}
        style={stylesContainer}
      >
        {!isEmptyText(title) && (
          <Text
            title={title}
            classes={{
              container: "section-title flex flex-col mt-[24px] text-center normal-case",
            }}
            styles={{ marginBottom: subtitle ? '24px' : '8px' }}
          />
        )}
        {!isEmptyText(subtitle) && (
          <Text
            title={subtitle}
            classes={{
              container: "section-subtitle mb-[16px] lg:mb-[24px] text-center normal-case",
            }}
          />
        )}
        {children ? (
          <div class="section-children-container w-full flex flex-col items-center justify-center">
            {children}
          </div>
        ) :
          <div
            style={{ height: "500px" }}
            class="flex justify-center items-center"
          >
            <span class="loading loading-spinner" />
          </div>
        }
      </div>
      <style>
        {`
           #section-${id} {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;
          }

          .section-title,
          .section-title h1,
          .section-title h2,
          .section-title h3,
          .section-title h4,
          .section-title h5,
          .section-title h6 {
            font-size: 26px;
            font-weight: 600;
            color: #041E50;
            text-transform: none;
          }

          .section-subtitle,
          .section-subtitle h1, 
          .section-subtitle h2, 
          .section-subtitle h3, 
          .section-subtitle h4, 
          .section-subtitle h5, 
          .section-subtitle h6 {
            font-size: 16px;
            font-weight: 400;
            color: #041e50;
          }

          @media screen and (min-width: 1280px) {
            #section-${id} {
              margin-top: ${marginTopDesktop}px;
              margin-bottom: ${marginBottomDesktop}px;
            }

            .section-title,
            .section-title h1,
            .section-title h2,
            .section-title h3,
            .section-title h4,
            .section-title h5,
            .section-title h6 {
              font-size: 36px;
            }

            .section-subtitle,
            .section-subtitle h1, 
            .section-subtitle h2, 
            .section-subtitle h3, 
            .section-subtitle h4, 
            .section-subtitle h5, 
            .section-subtitle h6 {
              font-size: 22px;
            }

            .section-children-container {
              max-width: 1200px;
            }
          }

          @media screen and (min-width: 1440px) {
            .section-children-container {
              max-width: 1360px;
            }
          }

          @media screen and (min-width: 1920px) {
            .section-children-container {
              max-width: 1600px;
            }
          }
      `}
      </style>
    </>
  );
}
