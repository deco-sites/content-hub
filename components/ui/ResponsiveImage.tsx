import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

export default function ResponsiveImage({
  src,
  alt,
  link,
  sizes,
  loadingOptions
}: IResponsiveImage): preact.JSX.Element {
  const {
    fullScreen = false,
    height = 440,
    width = 1920,
    heightMobile = 420,
    widthMobile = 420,
    maxWidth = "unset",
    maxHeight = "unset"
  } = sizes ?? {};

  const {
    preload = false,
    loading = "lazy",
    fetchPriority = "low"
  } = loadingOptions ?? {};

  const { desktop, mobile } = src ?? {};

  if (!desktop && !mobile) return <></>;

  const ResponsiveImageComponent = (
    <Picture
      class="flex items-center justify-center w-full h-full"
      style={{ width: fullScreen ? "100vw" : "100%" }}
      preload={preload}
    >
      {mobile && (
        <Source
          height={heightMobile}
          media="(max-width: 1023px)"
          src={mobile}
          width={widthMobile}
        />
      )}
      {desktop && (
        <img
          alt={alt}
          class="w-full h-full object-cover"
          height={height}
          loading={loading}
          src={desktop}
          style={{
            maxWidth,
            maxHeight
          }}
          width={width}
          {...{ fetchPriority }}
        />
      )}
    </Picture>
  );

  if (!link?.href) {
    return ResponsiveImageComponent;
  }

  const { href, title, target } = link ?? {};

  return (
    <a
      href={href}
      title={title ?? ""}
      target={`_${target}`}
      rel={target === "blank" ? "noopener noreferrer" : ""}
      class="flex no-underline"
    >
      {ResponsiveImageComponent}
    </a>
  );
}
