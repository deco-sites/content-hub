import { Text } from "@eluxlab/library-components";
import type { ISection } from "site/types/Section.d.ts";
import type { createElement, JSX } from "preact";

interface Props extends ISection {
  children?: createElement.JSX.Element;
  classesContainer?: string;
  stylesContainer?: JSX.AllCSSProperties;
}

export default function Section({
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
        .section-container {
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
