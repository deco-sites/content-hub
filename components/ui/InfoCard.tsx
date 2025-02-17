import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import { InfoCard as InfoCardComponent } from "@eluxlab/library-components";
import type {
  IInfoCard,
  IInfoCardVideo,
  IInfoCardImage
} from "site/types/InfoCard.d.ts";

export default function InfoCard(props: IInfoCard): preact.JSX.Element {
  const { typeOfContent } = props ?? {};

  const typeOfContentVideo = typeOfContent as IInfoCardVideo;
  const typeOfContentImage = typeOfContent as IInfoCardImage;

  const isVideo = !!typeOfContentVideo?.src;

  const hasVideoOrImage =
    isVideo ||
    Boolean(typeOfContentImage?.srcDesktop && typeOfContentImage?.srcMobile);

  return (
    <InfoCardComponent {...props}>
      {hasVideoOrImage ? (
        <>
          {isVideo ? (
            <iframe
              src={(typeOfContent as IInfoCardVideo).src}
              title={(typeOfContent as IInfoCardVideo).title}
              {...(typeOfContent as IInfoCardVideo).iframeProps}
            />
          ) : (
            <ResponsiveImage
              alt={typeOfContentImage.alt}
              src={{
                desktop: typeOfContentImage.srcDesktop,
                mobile: typeOfContentImage.srcMobile
              }}
              sizes={{ maxHeight: 500 }}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </InfoCardComponent>
  );
}
