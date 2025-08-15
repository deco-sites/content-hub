/** @title PDF com Texto abaixo */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";

interface Props {
  /** @title URL do PDF */
  pdfUrl?: string;

  /** @title Texto abaixo do PDF */
  footerText?: string;
}

export default function PdfWithTextSection({
  pdfUrl = "https://URL-do-seu-pdf-no-deco.pdf",
  footerText =
    "Termos e condições da campanha Frigidaire válida até 30 de setembro.",
}: Props) {
  const id = useId();

  return (
    <Section id={id} classesContainer="pdf-with-text-section py-10 px-4">
      <div class="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div class="w-full mb-6">
          <iframe
            src={pdfUrl}
            width="100%"
            height="600"
            class="w-full border rounded shadow"
          >
            Este navegador não suporta exibição de PDF.
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Clique aqui para abrir
            </a>
          </iframe>
        </div>

        {footerText && <p class="text-sm text-gray-700 w-full">{footerText}</p>}
      </div>
    </Section>
  );
}
