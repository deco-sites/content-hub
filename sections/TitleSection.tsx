import { Text, InfoIcon } from "@eluxlab/library-components";
import type { RichText, ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  title?: RichText;
  subtitle?: RichText;
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

function TitleSection({
  title,
  subtitle,
  icons = [],
  boxBackgroundColor,
  boxBackgroundColorHover,
}: Props) {
  return (
    <>
      <div className="sectionTitle">
        <Text title={title} />
        <Text title={subtitle} />
      </div>
      <div className="sectionInfoIcon flex items-center">
        {icons.map((icon, index) => (
          <div
            key={index}
            style={`background-color:${boxBackgroundColor};`}
            className="boxInfoIcon"
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
          </div>
        ))}
      </div>
      <style>{`.boxInfoIcon:hover{background-color:${boxBackgroundColorHover}}`}</style>
    </>
  );
}

export default TitleSection;
