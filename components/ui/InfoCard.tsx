import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import { InfoCard as InfoCardComponent } from "@eluxlab/library-components";
import type {
  IInfoCard,
  IInfoCardImage,
  IInfoCardVideo,
} from "site/types/InfoCard.d.ts";

export default function InfoCard(
  props: IInfoCard,
): preact.JSX.Element {
  const { typeOfContent } = props ?? {};

  const typeOfContentVideo = typeOfContent as IInfoCardVideo;
  const typeOfContentImage = typeOfContent as IInfoCardImage;

  const isVideo = !!typeOfContentVideo
    ?.src;

  const hasVideoOrImage = isVideo ||
    Boolean(
      typeOfContentImage?.srcDesktop &&
        typeOfContentImage?.srcMobile,
    );

  const linkComponent = (
    link: IInfoCard["link"],
  ) => {
    const {
      href,
      text,
      color = "#000",
    } = link ?? {};

    if (!text) return null;

    return (
      <>
        <a
          href={href ?? "/#"}
          title={text}
          class="info-card__link underline cursor-pointer flex items-center justify-center text-base text-[14px] text-normal"
          style={{
            color: `${color}`,
          }}
        >
          {text}
        </a>
      </>
    );
  };

  return (
    <InfoCardComponent
      {...{
        ...props,
        buttonChildren: linkComponent(
          props?.link,
        ),
      }}
    >
      {hasVideoOrImage
        ? (
          <>
            {isVideo
              ? (
                <iframe
                  src={(typeOfContent as IInfoCardVideo)
                    .src}
                  title={(typeOfContent as IInfoCardVideo)
                    .title}
                  height="100%"
                  style={{
                    border: "none",
                  }}
                  {...(typeOfContent as IInfoCardVideo)
                    .iframeProps}
                />
              )
              : (
                <ResponsiveImage
                  alt={typeOfContentImage
                    .alt}
                  src={{
                    desktop: typeOfContentImage
                      .srcDesktop,
                    mobile: typeOfContentImage
                      .srcMobile,
                  }}
                  sizes={{
                    maxHeight: 500,
                    heightMobile: 250,
                  }}
                />
              )}
          </>
        )
        : null}
    </InfoCardComponent>
  );
}
