import { Text } from "@eluxlab/library-components";
import { isEmptyText } from "site/utils/text.ts";
import type { ISection } from "site/types/Section.d.ts";

interface Props extends ISection {
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
}: Props): preact.JSX.Element {
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
              container: "section-title",
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
          #section-${id} {
            margin-top: ${marginTopMobile}px;
            margin-bottom: ${marginBottomMobile}px;

            @media screen and (min-width: 1024px) {
              margin-top: ${marginTopDesktop}px;
              margin-bottom: ${marginBottomDesktop}px;
          }
        }
      `}
      </style>
    </>
  );
}
