import { TextArea } from "apps/admin/widgets.ts";
import Section from "site/components/ui/Section.tsx";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import { DefaultTextSection } from "site/configs/TextSection.ts";

/** @description Componente de seção para inserção de textos. */
interface TextSectionProps {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Texto
   * @widget text-area
   * @default Lorem
   */
  text: TextArea;
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
    >
      <Text
        title={text ?? ""}
        classes={{
          container: "text-section-container w-full",
        }}
      />
      <style>
        {`
            .text-section-container {
              font-size: 16px;
              font-weight: 400;
              color: #041e50;
            }

            @media screen and (min-width: 1280px) {
              .text-section-container {
                max-width: 640px;
              }
            }

            @media screen and (min-width: 1440px) {
              .text-section-container {
                max-width: 800px;
              }
            }

            @media screen and (min-width: 1920px) {
              .text-section-container {
                max-width: 960px;
              }
            }
          `}
      </style>
    </Section>
  );
}
