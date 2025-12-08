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
            } info-card w-full justify-start items-center`,
            children:
              "infocard-children-container h-full flex flex-col items-start justify-center",
            button: `flex w-full pt-[0px] text-[14px]`,
            childrenTextContent: `${
              props?.link?.text ? "h-auto" : "h-full"
            } w-full info-card-inner`,
          }}
        />
        <style>
          {`
            .infocard-children-container .info-card-inner,
            .infocard-children-container .info-card-inner + div {
              max-width: 100%;
              padding: 0 24px;
              width: 100%;
            }
            .infocard-children-container {
              width: 100% !important;
            }
            .infocard-children-container:first-of-type {
              padding: 24px 0 !important;
            }

            .info-card-inner :is(h1, h2, h3, a, p) {
              margin-bottom: 16px;
            }
              
            @media (max-width: 993px) {
              .infocard-children-container .info-card-inner,
              .infocard-children-container .info-card-inner + div {
                max-width: 520px;
              }
            }

            @media screen and (min-width: 1081px) {
              .infocard-children-container {
                width: 50% !important;
              }

              .infocard-children-container .info-card-inner,
              .infocard-children-container .info-card-inner + div {
                max-width: 600px;
              }
            }

            @media screen and (min-width: 1281px) {
              .infocard-children-container .info-card-inner,
              .infocard-children-container .info-card-inner + div {
                max-width: 650px;
              }
            }

            @media screen and (min-width: 1367px) {

              .infocard-children-container .info-card-inner,
              .infocard-children-container .info-card-inner + div {
                max-width: 690px;
              }
            }

            @media screen and (min-width: 1440px) {
              .infocard-children-container .info-card-inner,
              .infocard-children-container .info-card-inner + div {
                max-width: 750px;
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
