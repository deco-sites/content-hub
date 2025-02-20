import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @description Componente de seção contendo um slider de cartões informativos.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;
}

export default function TitleSection({ section }: Props) {
  const id = useId();

  return (
    <Section
      {...section}
      id={id}
      classesContainer="general-text=section"
    ></Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[662px] lg:h-[637px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
