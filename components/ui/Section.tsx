import type { ISection } from "site/types/Section.d.ts";
import type { createElement } from "preact";

interface Props extends ISection {
  children?: createElement.JSX.Element;
}

export default function Section({
  children,
  title,
  marginMobile = 16,
  marginDesktop = 40
}: Props) {
  const isEmptyTitle = !!title?.trim().match(/^<\w+>\s*<\/\w+>$/) || !title;

  return (
    <div>
      <div class="section-container flex flex-col w-full gap-4">
        {!isEmptyTitle && (
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            class="section-title b-4"
          />
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

        .section-title {
          h1,h2,h3,h4,h5,h6 {
            color: #011e41;
            font-size: 24px;
            font-weight: 400;
            line-height: 100%;
            text-transform: uppercase;

            @media screen and (min-width: 1024px) {
              font-size: 36px;
              line-height: 43px;
            }
          }

          p,span {
            color: #041e50;
            font-size: 14px;
            line-height: 1.5;
          }
        }
      `}
      </style>
    </div>
  );
}
