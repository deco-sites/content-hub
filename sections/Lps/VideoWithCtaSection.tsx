/** @title Seção com Vídeo e CTA */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";

interface Props {
  /** @title URL do vídeo (YouTube embed) */
  videoUrl?: string;

  /** @title Título do produto */
  title?: string;

  /** @title Texto descritivo */
  description?: string;

  /** @title Texto do botão */
  ctaText?: string;

  /** @title Link do botão */
  ctaLink?: string;
}

export default function VideoWithCtaSection({
  videoUrl = "https://www.youtube.com/embed/pO7KwngOo_8",
  title = "Mailing de producto",
  description = "Descubra os benefícios exclusivos dessa nova linha de produto.",
  ctaText = "Call to action",
  ctaLink = "#",
}: Props) {
  const id = useId();

  return (
    <Section id={id} classesContainer="video-cta-section py-10">
      <div class="flex flex-col items-center max-w-5xl mx-auto text-center gap-6 px-4">
        {/* Vídeo embedado */}
        <div class="w-full aspect-video">
          <iframe
            class="w-full h-full rounded-md"
            src={videoUrl}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>

        {/* Conteúdo abaixo do vídeo */}
        <div class="space-y-4 mt-6">
          <h2 class="text-2xl font-bold">{title}</h2>
          {description && (
            <p class="text-gray-600">{description}</p>
          )}
          <a
            href={ctaLink}
            class="inline-block px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </Section>
  );
}