/** @title Seção Mailing de Produto com CTA e Imagem de Fundo */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";

interface Props {
  /** @title Título principal */
  title?: string;

  /** @title Texto descritivo */
  description?: string;

  /** @title Texto do botão */
  ctaText?: string;

  /** @title Link do botão */
  ctaLink?: string;

  /** @title Imagem de fundo */
  backgroundImage?: string;
}

export default function MailingProductSection({
  title = "Mailing de producto",
  description = "Descubra os benefícios exclusivos dessa nova linha de produto.",
  ctaText = "Call to action",
  ctaLink = "#",
  backgroundImage = "https://images.unsplash.com/photo-1753549724481-d146eaa3f0f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: Props) {
  const id = useId();

  return (
    <Section id={id} classesContainer="mailing-product-section p-0">
      <div
        class="w-full bg-cover bg-center bg-no-repeat min-h-[570px] lg:min-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Container total com paddings laterais responsivos */}
        <div class="w-full px-4 md:px-6 lg:px-10">
          {/* Bloco interno com fundo branco translúcido e largura total */}
          <div class="w-full text-center bg-white/80 backdrop-blur-sm rounded-lg py-10 px-4 md:px-10 space-y-6">
            <h2 class="text-2xl md:text-3xl font-bold">{title}</h2>
            {description && (
              <p class="text-base text-gray-700">{description}</p>
            )}
            <a
              href={ctaLink}
              class="inline-block px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
