import Image from "apps/website/components/Image.tsx";
import type { IBannerSlide } from "site/types/Banner.d.ts";

export default function Banner({
  srcMobile,
  srcDesktop,
  alt,
  link
}: IBannerSlide) {
  const BannerComponent = (
    <picture class="flex w-full">
      <source srcSet={srcMobile} media="(max-width: 1024px)" />
      <Image
        alt={alt}
        class="w-full"
        height={440}
        src={srcDesktop}
        width={1920}
      />
    </picture>
  );

  if (!link) {
    return BannerComponent;
  }

  const { href, title } = link;

  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      class="flex no-underline"
    >
      {BannerComponent}
    </a>
  );
}
