import { Text, InfoIcon } from "@eluxlab/library-components";
import type { RichText, ImageWidget, Color } from "apps/admin/widgets.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

interface Props {
  section?: ISection;
  icons?: IconItem[];
}

interface IconItem {
  iconTitle?: RichText;
  iconAlt?: string;
  iconRedirect?: string;
  iconSrc?: ImageWidget;
  iconTarget?: boolean;
  boxBackgroundColor?: Color;
  boxBackgroundColorHover?: Color;
}

function TitleSection({ icons = [], section }: Props) {
  return (
    <Section {...section}>
      <div className="sectionInfoIcon flex items-center gap-3 flex-wrap justify-center w-full">
        {icons.map((icon, index) => {
          const uniqueClass = `boxInfoIcon-${index}`;
          return (
            <div
              key={index}
              className={`boxInfoIcon ${uniqueClass} flex items-center text-center flex-col justify-center border- w-[120px] h-[120px]`}
              style={{
                backgroundColor: icon.boxBackgroundColor,
                borderRadius: "2px",
                border: "1px solid #eaebed",
                transition: "all .3s;",
              }}
            >
              <InfoIcon
                title={icon.iconTitle}
                image={{
                  alt: icon.iconAlt,
                  redirect: icon.iconRedirect,
                  imageSrc: icon.iconSrc,
                  target: icon.iconTarget,
                }}
              />
              {/* Generate styles dynamically */}
              <style>{`
                .${uniqueClass}:hover {
                  background-color: ${icon.boxBackgroundColorHover} !important;
                  transition: all .3s;
                }
                .${uniqueClass}:hover a {
                  filter: brightness(0) invert(1);
                  transition: all .3s;
                }
                .${uniqueClass} a {
                  transition: all .3s;
                }
              `}</style>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default TitleSection;

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
