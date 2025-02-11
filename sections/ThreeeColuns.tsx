import { Text, Image } from "http://127.0.0.1:5500/dist/index.js";
import type { RichText, ImageWidget, Color } from "apps/admin/widgets.ts";

interface Props {
  rightText?: RichText;
  rightTextColor?: Color;
  rightTextBackGroundColor?: Color;
  leftText?: RichText;
  leftTextColor?: Color;
  leftTextBackGroundColor?: Color;
  imageSrc?: ImageWidget;
  alt?: string;
  width?: string;
  height?: string;
}

export default function ThreeeColunstsx({
  rightText,
  leftText,
  imageSrc,
  alt,
  width,
  height,
  rightTextColor,
  rightTextBackGroundColor,
  leftTextColor,
  leftTextBackGroundColor,
}: Props) {
  return (
    <div
      class="containerThree flex items-stretch gap-x-[8px]"
      style="padding: 0 8.5vw;"
    >
      <div
        style={`background-color:${leftTextBackGroundColor}; color:${leftTextColor}`}
        class="flex boxThreeLeft w-[28vw] pr-[3vw] pl-[3vw] items-center"
      >
        <Text title={leftText} />
      </div>
      <div class="boxThreeMiddle w-[27vw]">
        <Image
          image={{
            alt: alt,
            imageSrc: imageSrc,
            width: width,
            height: height,
          }}
        />
      </div>
      <div
        style={`background-color:${rightTextBackGroundColor}; color:${rightTextColor}`}
        class="flex boxThreeRight w-[28vw] pr-[3vw] pl-[3vw] justify-center items-center"
      >
        <Text title={rightText} />
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
