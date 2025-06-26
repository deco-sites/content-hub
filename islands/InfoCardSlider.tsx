import Component from "site/components/ui/Slider.tsx";
import InfoCard from "site/components/ui/InfoCard.tsx";
import type {
  IInfoCard,
  IInfoCardImage,
  IInfoCardVideo,
} from "site/types/InfoCard.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

type Props = {
  infoCards?: IInfoCard[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island(
  {
    infoCards = [],
    configs = {},
    rootId,
  }: Props,
) {
  const slides = infoCards.map(
    (props) => {
      const { typeOfContent } = props ??
        {};

      const typeOfContentVideo = typeOfContent as IInfoCardVideo;
      const typeOfContentImage = typeOfContent as IInfoCardImage;
      const isVideo = !!typeOfContentVideo?.src;

      const enrichedTypeOfContent = isVideo
        ? {
          ...typeOfContentVideo,
          iframeProps: {
            ...typeOfContentVideo
              ?.iframeProps,
            className: props?.classes
              ?.children,
            id: `iframe-${rootId}`,
            width: "100%",
            allow: typeOfContentVideo
                ?.autoplay
              ? "autoplay"
              : "",
            allowFullScreen: true,
          },
        }
        : typeOfContentImage;

      return (
        <div class="flex w-full h-full bg-[#F6F6F6]">
          <InfoCard
            {...props}
            typeOfContent={enrichedTypeOfContent}
            classes={{
              container: `w-full info-card ${
                props?.direction ===
                    "left"
                  ? "flex-row"
                  : "flex-row-reverse"
              }`,
              children:
                `info-card-children w-full h-full flex flex-col justify-center`,
              button: `flex mt-8 w-full ${
                props?.direction ===
                    "left"
                  ? "justify-start lg:justify-end"
                  : "justify-start"
              }`,
              childrenTextContent: `w-full ${
                props?.link?.text ? "h-auto" : "h-full"
              }`,
            }}
          />
        </div>
      );
    },
  );

  return (
    <Component
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}

export default Island;
