import { InfoCard } from "@eluxlab/library-components";
import type { IInfoCardWithImage } from "site/types/InfoCardWithImage.d.ts";

export default function InfoCardWithImage({
  image,
  title,
  text,
  link
}: IInfoCardWithImage): React.JSX.Element {
  const { alt, src } = image;
  const { href, text: textLink, title: titleLink } = link;

  return (
    <div class="flex">
      <InfoCard
        richText=""
        left
        styles={{
          container: { flexDirection: "column" },
          children: { width: "auto", padding: "0", minHeight: "initial" }
        }}
        classes={{
          container:
            "py-6 px-4 border border-solid border-[#dfe7ea] min-h-[492px]"
        }}
      >
        <div class="flex mb-5">
          <img src={src} alt={alt} />
        </div>
        <div class="flex mb-4">
          <h3>{title}</h3>
        </div>
        <div class="flex mb-4">
          <p>{text}</p>
        </div>
        <div class="flex">
          <a href={href} title={titleLink}>
            {textLink}
          </a>
        </div>
      </InfoCard>
    </div>
  );
}
