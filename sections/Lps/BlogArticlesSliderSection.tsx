import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import BlogArticlesSliderIsland from "site/islands/BlogArticlesSliderIsland.tsx";

type ArticleSlide = {
  image: IResponsiveImage;
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
};

interface Props {
  section?: ISection;
  heading?: string;
  slides?: ArticleSlide[];
  panelBgColor?: string;
  defaultCtaLabel?: string;
}

export default function BlogArticlesSliderSection({
  section,
  heading = "Últimos Artigos:",
  slides = [],
  panelBgColor = "#041E50",
  defaultCtaLabel = "Saiba mais",
}: Props) {
  const id = useId();
  if (!slides.length) return null;

  return (
    <Section
      {...section}
      id={id}
      classesContainer="blog-articles-slider-section"
    >
      {/* Section espera 1 único filho */}
      <div>
        <div class="mx-auto">
          <Text
            title={heading}
            classes={{
              container:
                "mb-4 text-[24px] md:text-[36px] font-semibold tracking-[0] text-[#041E50] leading-none",
            }}
          />
        </div>

        <BlogArticlesSliderIsland
          rootId={id}
          slides={slides}
          panelBgColor={panelBgColor}
          defaultCtaLabel={defaultCtaLabel}
        />
      </div>
    </Section>
  );
}
