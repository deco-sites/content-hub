import Section from "../../components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import { TextArea } from "apps/admin/widgets.ts";
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
          container:
            "text-section-container w-full text-base text-left font-normal text-[#041e50] lg:max-w-[800px]",
        }}
      />
      <style>
        {`
        .text-section-container ul,
        .text-section-container ol {
          list-style: disc outside !important;
          margin: 0;
          padding-left: 20px;
        }
        
        .text-section-container h1 {
          font-size: 24px;
        }

        .text-section-container h2 {
          font-size: 20px;
        }

        .text-section-container h3 {
          font-size: 16px;
        }
        
        .text-section-container h1,
        .text-section-container h2,
        .text-section-container h3 {
          font-weight: 600;
          line-height: 1;
          margin-bottom: 24px;
        }

        .text-section-container p {
          line-height: 1.4;
          margin-bottom: 16px;
        }

        @media screen and (min-width: 1080px) {
          .text-section-container h1 {
            font-size: 48px;
          }

          .text-section-container h2 {
            font-size: 36px;
          }

          .text-section-container h3 {
            font-size: 24px;
          }
        }
        `}
      </style>
    </Section>
  );
}
