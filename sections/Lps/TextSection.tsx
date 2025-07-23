import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import { DefaultTextSection } from "site/configs/TextSection.ts";
/**
 * @description Componente de seção para inserção de textos.
 */
interface TextSectionProps {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Texto
   * @description Conteúdo em formato de rich text.
   * @format rich-text
   * @default Lorem ipsum
   */
  text?: string;
}

export default function TextSection({
  section,
  text = DefaultTextSection.text,
}: TextSectionProps) {
  const id = useId();

  return (
    <Section
      {...section}
      id={id}
      classesContainer="general-text-section normal-case"
    >
      <div class="flex items-center w-full">
        <Text
          title={text ?? ""}
          classes={{
            container: "text-section-container",
          }}
        />
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[662px] lg:h-[637px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
