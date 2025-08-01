/** @title Seção de Título Frigidaire */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

interface Props {
  /**
   * @title Configuração da Seção
   */
  section?: ISection;

  /**
   * @title Linha superior do texto
   * @default Nueva línea de cocinas Frigidaire
   */
  titleTop?: string;

  /**
   * @title Linha inferior em destaque
   * @default con Tecnología VaporBake
   */
  titleHighlight?: string;

  /**
   * @title Exibir logo como texto?
   * @default true
   */
  useTextLogo?: boolean;

  /**
   * @title Caminho do logo (caso imagem)
   * @description Deixe vazio se estiver usando o logo como texto.
   * @format image-uri
   */
  logoSrc?: string;
}

export default function TitleFrigidaireSection({
  section,
  titleTop = "Nueva línea de cocinas Frigidaire",
  titleHighlight = "con Tecnología VaporBake",
  useTextLogo = true,
  logoSrc,
}: Props) {
  const id = useId();

  return (
    <Section
      {...section}
      id={id}
      classesContainer="title-frigidaire-section"
    >
      <div class="w-full bg-[#FF405A] text-white text-center py-12 px-4 rounded-lg">
        {/* Logo */}
        {useTextLogo ? (
          <h2 class="text-2xl font-bold tracking-wide mb-6">FRIGIDAIRE</h2>
        ) : (
          logoSrc && (
            <img
              src={logoSrc}
              alt="Frigidaire"
              class="mx-auto mb-6 w-[160px]"
              loading="lazy"
            />
          )
        )}

        {/* Título */}
        <p class="text-lg lg:text-2xl font-medium">
          {titleTop}
          <br />
          <span class="font-bold">{titleHighlight}</span>
        </p>
      </div>
    </Section>
  );
}
