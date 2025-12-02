import Component from "site/components/ui/Slider.tsx";
import InfoCard from "site/components/ui/InfoCard.tsx";
import type {
  IInfoCard,
  IInfoCardImage,
  IInfoCardVideo,
} from "site/types/InfoCard.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

interface InfoCardSliderProps {
  infoCards?: IInfoCard[];
  configs?: ISliderConfigs;
  rootId: string;
}

export default function InfoCardSlider({
  infoCards = [],
  configs = {},
  rootId,
}: InfoCardSliderProps) {
  const slides = infoCards.map((props) => {
    const { typeOfContent, textBackgroundColor } = props ?? {};

    const typeOfContentVideo = typeOfContent as IInfoCardVideo;
    const typeOfContentImage = typeOfContent as IInfoCardImage;
    const isVideo = !!typeOfContentVideo?.src;

    const enrichedTypeOfContent = isVideo
      ? {
        ...typeOfContentVideo,
        iframeProps: {
          ...typeOfContentVideo?.iframeProps,
          className: props?.classes?.children,
          id: `iframe-${rootId}`,
          width: "100%",
          allow: typeOfContentVideo?.autoplay ? "autoplay" : "",
          allowFullScreen: true,
        },
      }
      : typeOfContentImage;

    return (
      <div class="flex w-full h-full bg-[#F6F6F6]">
        <InfoCard
          {...props}
          typeOfContent={enrichedTypeOfContent}
          styles={{
            children: {
              padding: "0",
              minHeight: "initial",
              backgroundColor: textBackgroundColor || undefined,
            },
          }}
          classes={{
            container: `${
              props?.direction === "left"
                ? "flex-col lg:flex-row"
                : "flex-col-reverse lg:flex-row-reverse"
            } w-full justify-start items-center`,
            children:
              "infoCardChildren h-full flex flex-col items-start justify-center",
            button: `flex w-full pt-[0px] text-[14px]`,
            childrenTextContent: `${
              props?.link?.text ? "h-auto" : "h-full"
            } w-full infoCardInner`,
          }}
        />
        <style>
          {`
            .infoCardChildren .infoCardInner,
            .infoCardChildren .infoCardInner + div {
              max-width: clamp(751px, 48vw, 751px);
              padding: 0 24px;
              width: 100%;
            }
            .infoCardChildren {
              width: 100% !important;
            }
              
            .infoCardChildren:first-of-type {
              padding: 24px 0 !important;
            }

            @media screen and (min-width: 1081px) {
              .infoCardChildren {
                width: 50% !important;
              }

              .infoCardChildren .infoCardInner,
              .infoCardChildren .infoCardInner + div {
                padding: 0 0 0 24px;
              }
            }
          `}
        </style>
      </div>
    );
  });

  return (
    <Component
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}
