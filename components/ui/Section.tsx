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
        class={`section-container flex flex-col w-full gap-4 lg:gap-6 ${classesContainer ?? ""
          } ${!fullWidth ? "container" : ""}`}
        style={stylesContainer}
      >
        {!isEmptyText(title) && (
          <Text
            title={title}
            classes={{
              container: "section-title flex flex-col gap-y-[8px]",
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
          .section-title > h1 {
            font-size: 26px;
            font-weight: 600;
            color: #041E50;
            text-transform: none;
          }

          #section-${id} {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;

          }

          @media screen and (min-width: 1280px) {
            .section-title > h1 {
              font-size: 36px;
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
