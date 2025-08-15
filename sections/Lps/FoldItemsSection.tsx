import { TextArea } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import FoldItemsIsland from "site/islands/FoldItemsIsland.tsx";
import type { FoldItem } from "site/islands/FoldItemsIsland.tsx";

/**
 * @title Seção de items "abre e fecha"
 * @description Exibe um item ou uma coleção de items que abrem e fecham a partir do click ou toque na imagem.
 */
interface FoldItemsSectionProps {
  section?: ISection;
  foldItems?: FoldItem[];
}

export default function FoldItemsSection(
  { section, foldItems = [] }: FoldItemsSectionProps,
) {
  const id = useId();

  return (
    <Section {...section} id={id}>
      <FoldItemsIsland foldItems={foldItems} />
    </Section>
  );
}
