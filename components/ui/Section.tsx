import { Text } from "@eluxlab/library-components";
import { isEmptyText } from "site/utils/text.ts";
import type { ISection } from "site/types/Section.d.ts";
import LoadingFallback from "./LoadingFallback.tsx";

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
  centralizeTitleAndSubtitle = false,
  articlePaddingForTitleAndSubtitle = false,
  articlePaddingForContent = false
}: ISection) {
  return (
    <div
      id={`section-${id}`}
      class={`section-container flex flex-col justify-center items-center w-full ${classesContainer ?? ""} ${!fullWidth && "container"}`}
    >
      {!isEmptyText(title) && (
        <Text
          title={title}
          classes={{
            container:
              `section-title mt-[24px] normal-case font-semibold text-[#041E50] w-full ${centralizeTitleAndSubtitle ? "text-center" : "text-left"
              } ${articlePaddingForTitleAndSubtitle && "lg:max-w-[800px]"} ${isEmptyText(subtitle) ? "mb-[24px]" : "mb-[8px]"}
                `,
          }}
        />
      )}
      {!isEmptyText(subtitle) && (
        <Text
          title={subtitle}
          classes={{
            container:
              `section-subtitle mb-[16px] lg:mb-[24px] normal-case font-normal text-[#041E50] w-full ${centralizeTitleAndSubtitle ? "text-center" : "text-left"
              } ${articlePaddingForTitleAndSubtitle && "lg:max-w-[800px]"}`,
          }}
        />
      )}
      {children
        ? (
          <div
            class={`w-full flex flex-col items-center justify-center ${articlePaddingForContent && "lg:max-w-[800px]"}`}
          >
            {children}
          </div>
        )
        : <LoadingFallback />}

      <style>
        {`
          #section-${id} {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;
          }

          .section-title h1,
          .section-subtitle h1 {
            font-size: 24px;
          }

          .section-title h2,
          .section-subtitle h2 {
            font-size: 20px;
          }

          .section-title h3,
          .section-subtitle h3 {
            font-size: 16px;
          }

          @media screen and (min-width: 1080px) {
            #section-${id} {
              margin-top: ${marginTopDesktop}px;
              margin-bottom: ${marginBottomDesktop}px;
            }

            .section-container {
              width: 1000px;
            }

            .section-title h1,
            .section-subtitle h1 {
              font-size: 48px;
            }

            .section-title h2,
            .section-subtitle h2 {
              font-size: 36px;
            }

            .section-title h3,
            .section-subtitle h3 {
              font-size: 24px;
            }
          }

          @media screen and (min-width: 1280px) {
            .section-container {
              width: 1200px;
            }
          }

          @media screen and (min-width: 1366px) {
            .section-container {
              width: 1286px;
            }
          }

          @media screen and (min-width: 1440px) {
            .section-container {
              width: 1360px;
            }
          }

          @media screen and (min-width: 1920px) {
            .section-container {
              width: 1600px;
            }
          }
        `}
      </style>
    </div>
  );
}
