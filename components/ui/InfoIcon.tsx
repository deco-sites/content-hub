import { InfoIcon as Component } from "@eluxlab/library-components";
import type { IInfoIcon } from "site/types/InfoIcon.d.ts";

export default function InfoIcon({
  boxBackgroundColorHover,
  boxBackgroundColor,
  title,
  alt,
  redirect,
  imageSrc,
  target,
}: IInfoIcon): preact.JSX.Element {
  return (
    <>
      <div
        class="categories-section__container box-border px-1 flex items-center text-center flex-col justify-center border border-solid border-[#eaebed] rounded-[2px] transition-all ease-in duration-300 group w-[100px] h-[100px] lg:w-[122px] lg:h-[122px]"
        style={{
          background: boxBackgroundColor,
        }}
      >
        <Component
          title={title}
          image={{
            alt,
            redirect,
            imageSrc,
            target,
            width: 41,
            height: 41,
          }}
          classes={{
            containerLink: "gap-1",
            image:
              "group-hover:[filter:brightness(0)_invert(1)] transition-all duration-300 ease-in",
            title:
              "text-[#011e41] text-xs leading-[initial] group-hover:text-[#fff] transition-all duration-300 ease-in lg:min-h-[48px] lg:text-base",
          }}
        />
      </div>
      <style>
        {`
          .categories-section__container:hover {
            background: ${boxBackgroundColorHover} !important;
          }
        `}
      </style>
    </>
  );
}
