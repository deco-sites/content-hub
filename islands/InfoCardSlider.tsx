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
};

export default function InfoCardSlider({
  infoCards = [],
  configs = {},
  rootId,
}: InfoCardSliderProps) {
  const slides = infoCards.map((props) => {
    const { typeOfContent, textBackgroundColor, textColor } = props ?? {};

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
          classes={{
            container: `${props?.direction === "left" ? "flex-col lg:flex-row" : "flex-col-reverse lg:flex-row-reverse"} w-full justify-start items-center`,
            children:
              `infocard-children-container h-full flex flex-col items-start justify-center`,
            button: `flex w-full`,
            childrenTextContent: `${props?.link?.text ? "h-auto" : "h-full"} w-full`,
          }}
          styles={{
            children: {
              backgroundColor: textBackgroundColor || undefined,
              color: textColor || undefined,
            },
          }}
        />
        <style>
          {`
            .infocard-children-container {
              width: 100% !important;
              min-height: unset !important;
              padding: 0 !important;
            }

            .infocard-children-container > div {
              padding: 24px;
              gap: 8px;
            }

            .infocard-children-container > div,
            .infocard-children-container > div h1,
            .infocard-children-container > div h2,
            .infocard-children-container > div h3,
            .infocard-children-container > div h4,
            .infocard-children-container > div h5,
            .infocard-children-container > div h6,
            .infocard-children-container > div p {
              text-align: start;
            }

            @media screen and (min-width: 1024px) {
              .infocard-children-container > div {
                align-items: flex-start;
                gap: 16px;
                max-width: 576px;
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
