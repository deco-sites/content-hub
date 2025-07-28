import Section from "site/components/ui/Section.tsx";
import InfoIcon from "site/components/ui/InfoIcon.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { IInfoIcon } from "site/types/InfoIcon.d.ts";
import { DefaultCategoriesSection } from "site/configs/CategoriesSection.ts";

interface CategoriesSectionProps {
  section?: ISection;

  /**
   * @title Ícones
   * @description Lista de ícones a serem exibidos na seção.
   */
  icons?: IInfoIcon[];
}

export default function CategoriesSection(
  {
    icons = DefaultCategoriesSection.icons,
    section,
  }: CategoriesSectionProps,
) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      <div class="categories-section flex items-center gap-3 flex-wrap justify-center w-full h-full">
        {icons?.map((icon, idx) => {
          return (
            <InfoIcon
              {...icon}
              key={`${icon?.title ?? "icon"}-${idx}`}
            />
          );
        })}
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[445px] lg:h-[297px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
