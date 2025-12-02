import classNames from 'classnames';
import { Text } from "@eluxlab/library-components";
import { isEmptyText } from "site/utils/text.ts";
import type { ISection } from "site/types/Section.d.ts";
import LoadingFallback from "./LoadingFallback.tsx";

export default function Section({
  id,
  children,
  title = "",
  subtitle = "",
  titleAlignment,
  marginBottomMobile = 40,
  marginBottomDesktop = 40,
  marginTopMobile = 0,
  marginTopDesktop = 0,
  classesContainer,
  fullWidth = false,
  centralizeTitleAndSubtitle = false,
  articlePaddingForTitleAndSubtitle = false,
  articlePaddingForContent = false,
}: ISection) {
  const effectiveTitleAlignment = centralizeTitleAndSubtitle
    ? "center"
    : titleAlignment?.desktop ?? "left";

  const titleAlignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[effectiveTitleAlignment];

  return (
    <div
      id={`section-${id}`}
      class={classNames(
        "section-container flex flex-col justify-center items-center w-full",
        fullWidth ? "section-container--full max-w-none" : "container mx-auto",
        classesContainer
      )}
    >
      {!isEmptyText(title) && (
        <Text
          title={title}
          classes={{
            container: `section-title mt-[24px] normal-case font-semibold text-[#041E50] w-full ${titleAlignmentClass} ${
              articlePaddingForTitleAndSubtitle && "lg:max-w-[800px]"
            } ${isEmptyText(subtitle) ? "mb-[24px]" : "mb-[8px]"}`,
          }}
        />
      )}
      {!isEmptyText(subtitle) && (
        <Text
          title={subtitle}
          classes={{
            container: `section-subtitle mb-[16px] lg:mb-[24px] normal-case font-normal text-[#041E50] w-full ${titleAlignmentClass} ${
              articlePaddingForTitleAndSubtitle && "lg:max-w-[800px]"
            }`,
          }}
        />
      )}
      {children ? (
        <div
          class={`w-full flex flex-col items-center justify-center ${
            articlePaddingForContent && "lg:max-w-[800px]"
          }`}
        >
          {children}
        </div>
      ) : (
        <LoadingFallback />
      )}

      <style>
        {`
          .section-container {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;
          }

          .section-container:not(.section-container--full) {
            --container: 1600px;
            --padding: 1rem;

            max-width: calc(var(--container) + var(--padding) * 2);
            padding: 0 var(--padding);
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
            .section-container {
              margin-top: ${marginTopDesktop}px;
              margin-bottom: ${marginBottomDesktop}px;
            }

            .section-container:not(.section-container--full) {
              --padding: 2rem;
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
        `}
      </style>
    </div>
  );
}
