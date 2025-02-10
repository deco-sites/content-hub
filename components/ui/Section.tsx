import { Text } from "@eluxlab/library-components";
import type { ISection } from "site/types/Section.d.ts";
import type { createElement } from "preact";

interface Props extends ISection {
  children?: createElement.JSX.Element;
}

export default function Section({
  children,
  title,
  marginMobile = 32,
  marginDesktop = 52
}: Props) {
  const isEmptyTitle = !!title?.trim().match(/^<\w+>\s*<\/\w+>$/) || !title;

  return (
    <div>
      <div class="section-container flex flex-col w-full gap-4">
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
    </div>
  );
}
