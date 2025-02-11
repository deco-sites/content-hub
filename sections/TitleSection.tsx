import { Text, InfoIcon } from "http://127.0.0.1:5500/dist/index.js";
import type { RichText, ImageWidget, Color } from "apps/admin/widgets.ts";

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
            className={`boxInfoIcon bg-[${boxBackgroundColor}] hover:bg-[${boxBackgroundColorHover}]`}
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
    </>
  );
}

export default TitleSection;
