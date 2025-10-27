// sections/Lps/BlogArticlesSliderSection.tsx
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
        <div class="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h2
            class="mb-4 text-[24px] md:text-[36px] font-semibold tracking-[0] text-[#041E50]"
            style={{
              fontFamily: "Electrolux Sans, sans-serif",
              lineHeight: "100%",
            }}
          >
            {heading}
          </h2>
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
