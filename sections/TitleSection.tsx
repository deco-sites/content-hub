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
}

function TitleSection({ title, subtitle, icons = [] }: Props) {
  return (
    <>
      <div>
        <Text title={title} />
        <Text title={subtitle} />
      </div>
      <div>
        {icons.map((icon, index) => (
          <div key={index}>
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
