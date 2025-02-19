import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
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

  /**
   * @title Texto
   * @description Conteúdo em formato de rich text.
   * @format rich-text
   * @default Lorem ipsum
   */
  text?: string;
}

export default function TextSection({ section, text }: Props) {
  const id = useId();

  return (
    <Section {...section} id={id} classesContainer="general-text=section">
      <div class="flex items-center w-full p-5 md:p-[1.5vh_5vw] lg:p-[1.5vh_3vw] xl:p-[0_3vw] xl:w-[33.3%]">
        <Text title={text ?? ""} />
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
