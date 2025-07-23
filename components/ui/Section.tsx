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
              container: "section-title flex flex-col gap-y-[8px] mt-[24px] text-center normal-case",
            }}
          />
        )}
        {!isEmptyText(subtitle) && (
          <Text
            title={subtitle}
            classes={{
              container: "section-subtitle mb-[16px] text-center normal-case",
            }}
          />
        )}
        {children && (
          <div class="flex">
            {children}
          </div>
        )}
      </div>
      <style>
        {`
          .section-title {
            font-size: 26px;
            font-weight: 600;
            color: #041E50;
          }

          .section-subtitle {
            font-size: 16px;
            font-weight: 400;
            color: #041e50;
          }

          #section-${id} {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;
          }

          @media screen and (min-width: 1280px) {
            .section-title {
              font-size: 36px;
            }

            .section-subtitle {
              font-size: 22px;
            }

            #section-${id} {
              margin-top: ${marginTopDesktop}px;
              margin-bottom: ${marginBottomDesktop}px;
            }
        }
      `}
      </style>
    </>
  );
}
