import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

interface Props {
  infoCards?: IInfoCardCustom[];
  rootId: string;
  configs?: ISliderConfigs;
}

export default function CustomInfoCardSlider({
  infoCards = [],
  rootId,
}: Props) {
  if (!infoCards.length) return null;

  return (
    <div id={rootId} class="w-full overflow-hidden">
      <div class="flex flex-col gap-8 lg:gap-12">
        {infoCards.map((card, index) => (
          <div
            key={index}
            class={`flex flex-col lg:flex-row ${
              card?.direction === "left" ? "" : "lg:flex-row-reverse"
            } w-full h-[453px] items-center justify-between`}
          >
            {/* Mídia */}
            <div class="w-full lg:w-1/2 h-full flex justify-center items-center">
              {card?.typeOfContent &&
              "src" in card.typeOfContent &&
              card.typeOfContent.src.endsWith(".mp4") ? (
                <video
                  src={card.typeOfContent.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  class="w-full h-full object-cover"
                />
              ) : card?.typeOfContent &&
                "srcDesktop" in card.typeOfContent ? (
                <img
                  src={card.typeOfContent.srcDesktop}
                  alt={card.typeOfContent.alt ?? "Imagem"}
                  class="w-full h-full object-cover"
                />
              ) : null}
            </div>

            {/* Texto */}
            <div
              class="w-full lg:w-1/2 h-full p-6 lg:p-10 flex flex-col justify-center"
              style={{
                backgroundColor: card?.textBackgroundColor ?? "#000000",
                color: card?.textColor ?? "#FFFFFF",
                fontFamily: card?.fontFamily ?? "Arial",
              }}
            >
              {card?.title && (
                <h2
                  class="mb-4 uppercase font-bold text-[14px] leading-[20px] md:text-[34px] md:leading-[48px]"
                  dangerouslySetInnerHTML={{ __html: card.title }}
                />
              )}

              {card?.description && (
                <p
                  class="text-[12px] leading-[18px] md:text-[16px] md:leading-[20px] font-normal"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              )}

              {card?.link?.href && (
                <div class="mt-6">
                  <a
                    href={card.link.href}
                    class="inline-block bg-white text-black px-6 py-2 rounded font-semibold hover:opacity-80 transition"
                  >
                    {card.link.text ?? "Saiba mais"}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
