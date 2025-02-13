import { Text } from "@eluxlab/library-components";
import type { ISection } from "site/types/Section.d.ts";

interface Props extends ISection {
  id: string;
}

export default function Section({
  id,
  children,
  title,
  marginMobile = 32,
  marginDesktop = 52,
  classesContainer,
  stylesContainer = {}
}: Props): preact.JSX.Element {
  const isEmptyTitle = !!title?.trim().match(/^<\w+>\s*<\/\w+>$/) || !title;

  return (
    <>
      <div
        id={`section-${id}`}
        class={`section-container flex flex-col w-full gap-4 lg:gap-6 ${
          classesContainer ?? ""
        }`}
        style={stylesContainer}
      >
        {!isEmptyTitle && (
          <Text title={title} classes={{ container: "section-title" }} />
        )}
        {children && <div class="flex">{children}</div>}
      </div>
      <style>
        {`
        #section-${id} {
          margin-bottom: ${marginMobile}px;

          @media screen and (min-width:1024px) {
            margin-bottom: ${marginDesktop}px;
          }
        }
      `}
      </style>
    </>
  );
}
