import { Text, Image } from "http://127.0.0.1:5500/dist/index.js";
import type { RichText, ImageWidget, Color } from "apps/admin/widgets.ts";

interface Props {
  rightText?: RichText;
  rightTextColor?: Color;
  rightTextBgColor?: Color;
  leftText?: RichText;
  leftTextColor?: Color;
  leftTextBgColor?: Color;
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
  rightTextBgColor,
  leftTextColor,
  leftTextBgColor,
}: Props) {
  return (
    <div class="containerThree flex items-stretch" style="padding: 0 8.5vw;">
      <div
        style={`background-color:${leftTextColor}; color:${leftTextBgColor}`}
        class="boxThreeLeft w-[28vw]"
      >
        <Text title={leftText} />
      </div>
      <div class="boxThreeMiddle w-[28vw]">
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
        style={`background-color:${rightTextColor}; color:${rightTextBgColor}`}
        class="boxThreeRight w-[28vw]"
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
