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
  marginBottomMobile = 0,
  marginBottomDesktop = 0,
  marginTopMobile = 0,
  marginTopDesktop = 0,
  classesContainer,
  fullWidth = false,
}: SectionProps) {
  return (
    <>
      <div
        id={`section-${id}`}
        class={`section-container flex flex-col justify-center items-center w-full ${classesContainer ?? ""
          } ${!fullWidth ? "container" : ""}`}
      >
        {!isEmptyText(title) && (
          <Text
            title={title}
            classes={{
              container:
                `section-title mt-[24px] text-left normal-case font-semibold text-[#041E50] w-full lg:max-w-[800px] ${isEmptyText(subtitle) ? "mb-[24px]" : "mb-[8px]"}`,
            }}
          />
        )}
        {!isEmptyText(subtitle) && (
          <Text
            title={subtitle}
            classes={{
              container:
                "section-subtitle mb-[16px] lg:mb-[24px] text-left normal-case font-normal text-[#041E50] w-full lg:max-w-[800px]",
            }}
          />
        )}
        {children
          ? (
            <div
              class={`${fullWidth ? "w-full" : "section-children-container"
                }  flex flex-col items-center justify-center`}
            >
              {children}
            </div>
          )
          : (
            <div class="w-full flex justify-center items-center">
              <span class="loading loading-spinner" />
            </div>
          )}
      </div>
      <style>
        {`
          #section-${id} {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;
          }

          .section-children-container {
            width: 100%;
          }

          .section-title h1,
          .section-subtitle h1,
          .section-children-container h1 {
            font-size: 24px;
          }

          .section-title h2,
          .section-subtitle h2,
          .section-children-container h2 {
            font-size: 20px;
          }

          .section-title h3,
          .section-subtitle h3,
          .section-children-container h3 {
            font-size: 16px;
          }

          .section-children-container h1,
          .section-children-container h2,
          .section-children-container h3 {
            font-weight: 600;
            line-height: 1;
            margin-bottom: 24px;
          }
          
          .section-children-container p {
            line-height: 1.4;
            margin-bottom: 16px;
          }

          @media screen and (min-width: 1080px) {
            #section-${id} {
              margin-top: ${marginTopDesktop}px;
              margin-bottom: ${marginBottomDesktop}px;
            }

            .section-children-container {
              width: 1000px;
            }

            .section-title h1,
            .section-subtitle h1,
            .section-children-container h1 {
              font-size: 48px;
            }

            .section-title h2,
            .section-subtitle h2,
            .section-children-container h2 {
              font-size: 36px;
            }

            .section-title h3,
            .section-subtitle h3,
            .section-children-container h3 {
              font-size: 24px;
            }
          }

          @media screen and (min-width: 1280px) {
            .section-children-container {
              width: 1200px;
            }
          }

          @media screen and (min-width: 1366px) {
            .section-children-container {
              width: 1286px;
            }
          }

          @media screen and (min-width: 1440px) {
            .section-children-container {
              width: 1360px;
            }
          }

          @media screen and (min-width: 1920px) {
            .section-children-container {
              width: 1600px;
            }
          }
        `}
      </style>
    </>
  );
}
