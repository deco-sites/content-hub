import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import { InfoCard } from "@eluxlab/library-components";
import type { IArticle } from "site/types/Article.d.ts";

export default function Article({
  image,
  title,
  text,
  link
}: IArticle): preact.JSX.Element {
  const { href, text: textLink, title: titleLink } = link;

  return (
    <div class="flex w-full h-full">
      <InfoCard
        styles={{
          container: { flexDirection: "column", width: "auto" },
          children: { width: "auto", padding: "0", minHeight: "initial" }
        }}
        classes={{
          container:
            "py-6 px-4 border border-solid border-[#dfe7ea] min-h-[492px]",
          children: "flex flex-col"
        }}
      >
        <div class="flex mb-5">
          <ResponsiveImage {...image} />
        </div>
        <div class="flex mb-4">
          <h3 class="text-[#303f29] text-2xl font-semibold leading-[30px] text-left overflow-hidden text-ellipsis line-clamp-4 min-h-[60px] max-h-[120px] tracking-[.5px]">
            {title}
          </h3>
        </div>
        <div class="flex mb-4">
          <p class="text-[#707070] text-base font-normal leading-[24px] text-left overflow-hidden text-ellipsis line-clamp-6 min-h-[120px]">
            {text}
          </p>
        </div>
        <div class="flex">
          <a
            href={href}
            title={titleLink}
            class="text-[#617f57] text-base font-semibold leading-[20px] underline"
          >
            {textLink}
          </a>
        </div>
      </InfoCard>
    </div>
  );
}
