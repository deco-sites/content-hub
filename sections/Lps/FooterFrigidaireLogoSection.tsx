/** @title Rodapé com Logo da Frigidaire */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

interface Props {
  section?: ISection;
  logo?: {
    src: string;
    alt?: string;
  };
}

export default function FooterFrigidaireLogoSection({ section, logo }: Props) {
  const id = useId();

  if (!logo?.src) return null;

  return (
    <Section {...section} id={id} classesContainer="footer-frigidaire-logo-section">
      <div class="w-full flex justify-center">
        <div class="text-center">
          <img
            src={logo.src}
            alt={logo.alt ?? "Logo Frigidaire"}
            class="mb-2 max-w-full h-auto mx-auto"
            loading="lazy"
          />
          <h1
            style={{
              textAlign: "center",
              fontFamily: "'Gotham', sans-serif",
              fontWeight: "700",
              fontSize: "48px",
              lineHeight: "1.2",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "red" }}>ATRÉVETE</span> A DISFRUTAR MÁS
          </h1>
        </div>
      </div>
    </Section>
  );
}
