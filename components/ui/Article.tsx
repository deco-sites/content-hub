import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import { InfoCard, Text } from "@eluxlab/library-components";
import { isEmptyText } from "site/utils/text.ts";
import type { IArticle } from "site/types/Article.d.ts";

export default function Article({
  image,
  text = "",
  link,
}: IArticle): preact.JSX.Element {
  const { href, text: textLink, title: titleLink, color, hideLink = false } =
    link ?? {};

  return (
    <div class="article flex w-full h-full">
      <InfoCard
        styles={{
          container: { flexDirection: "column", width: "auto" },
          children: { width: "auto", padding: "0", minHeight: "initial" },
        }}
        classes={{
          container:
            "article__container py-6 px-4 border border-solid border-[#dfe7ea] min-h-[492px]",
          children: "flex flex-col",
        }}
      >
        <div class="article__image flex mb-5">
          <ResponsiveImage {...image} />
        </div>
        <div class="article__content flex flex-col w-full gap-4">
          {!isEmptyText(text) && (
            <Text
              title={text}
              classes={{ container: "article__content-text" }}
            />
          )}
          {!hideLink && (
            <div class="article__content-link flex items-center">
              <a
                href={href}
                title={titleLink}
                class="flex items-center text-base font-semibold leading-[20px] underline"
                style={{ color: `${color}` }}
              >
                {textLink}
              </a>
            </div>
          )}
        </div>
      </InfoCard>
    </div>
  );
}
