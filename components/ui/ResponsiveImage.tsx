import Image from "apps/website/components/Image.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

export default function ResponsiveImage({
  srcMobile,
  srcDesktop,
  alt,
  link,
  fullScreen = false,
  height = 440,
  width = 1920,
  maxWidth = "unset",
  maxHeight = "unset"
}: IResponsiveImage): preact.JSX.Element {
  if (!srcMobile && !srcDesktop) return <></>;

  const ResponsiveImageComponent = (
    <picture
      class="flex w-full h-full"
      style={{ width: fullScreen ? "100vw" : "100%" }}
    >
      <source srcSet={srcMobile} media="(max-width: 1024px)" />
      {srcDesktop && (
        <Image
          alt={alt}
          class="object-cover z-10 w-full h-full"
          decoding="async"
          height={height}
          loading="lazy"
          src={srcDesktop}
          width={width}
          style={{
            maxWidth,
            maxHeight
          }}
        />
      )}
    </picture>
  );

  if (!link?.href) {
    return ResponsiveImageComponent;
  }

  const { href, title } = link ?? {};

  return (
    <a
      href={href}
      title={title ?? ""}
      target="_blank"
      rel="noopener noreferrer"
      class="flex no-underline"
    >
      {ResponsiveImageComponent}
    </a>
  );
}
