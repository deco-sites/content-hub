import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

/**
 * @title Seção de Ícones em Grid
 * @description Exibe ícones em um grid responsivo (duas colunas em mobile e em linha em desktop).
 */
export interface IconItem {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Descrição
   * @description Subtítulo, subtexto ou texto descritivo.
   */
  description?: string;
  /**
   * @title Ícones
   */
  icon: IResponsiveImage;
}

export interface IconGridSectionProps {
  section?: ISection;
  iconItems?: IconItem[];
}

export default function IconGridSection(
  {
    section,
    iconItems = [],
  }: IconGridSectionProps,
) {
  const id = useId();

  if (!iconItems?.length) return null;

  return (
    <Section {...section} id={id}>
      <div class="w-full grid grid-cols-2 gap-y-[16px] gap-x-[16px] mb-[24px] lg:flex lg:justify-between lg:items-start lg:my-[72px]">
        {iconItems.map((
          item,
          index,
        ) => (
          <div
            key={index}
            class="flex flex-col justify-center items-center gap-y-[12px] lg:gap-y-[24px] lg:w-[180px]"
          >
            <div class="icon-container flex justify-center items-center w-full object-contain max-w-[48px]">
              {item.icon.src?.mobile || item.icon.src?.desktop
                ? (
                  <ResponsiveImage
                    {...item.icon}
                    sizes={{
                      width: 48,
                      height: 48,
                      widthMobile: 48,
                      heightMobile: 48,
                    }}
                  />
                )
                : null}
            </div>
            <div class="flex flex-col justify-center items-center w-full lg:gap-y-[4px]">
              <h3 class="text-[16px] font-semibold text-[#041E50]">
                {item.title}
              </h3>
              <p class="hidden text-center lg:block lg:text-[14px] lg:font-normal lg:text-[#5B6A78] lg:overflow-hidden">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <style>{`.icon-container img {object-fit: contain !important;}`}</style>
    </Section>
  );
}
