/** @title Seção Final com Comparativo e CTA */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

interface Props {
  section?: ISection;

  /**
   * @title Imagem da grelha alambrón
   * @format image-uri
   */
  leftImage?: string;

  /**
   * @title Imagem da grelha de ferro fundido
   * @format image-uri
   */
  rightImage?: string;
}

export default function FinalCtaWithCardsSection({
  section,
  leftImage,
  rightImage,
}: Props) {
  const id = useId();

  return (
    <Section {...section} id={id} classesContainer="final-cta-section">
      <div class="w-full bg-[#FF405A] text-white px-4 py-16 text-center">
        {/* Título */}
        <h2 class="text-xl lg:text-2xl font-bold mb-10">
          ¡Cocinar nunca ha sido más seguro!<br />
          <span class="font-medium text-sm lg:text-base">
            Diseño superior con 8 puntos de apoyo
          </span>
        </h2>

        {/* Imagens lado a lado */}
        <div class="flex flex-col lg:flex-row justify-center gap-6 max-w-5xl mx-auto mb-12">
          {/* Card 1 */}
          <div class="bg-white text-black rounded overflow-hidden max-w-sm mx-auto">
            {leftImage && (
              <img
                src={leftImage}
                alt="Parrilla de alambrón"
                class="w-full"
              />
            )}
            <div class="bg-white p-4">
              <p class="font-semibold text-base">Parrillas de alambrón</p>
              <p class="text-[#FF405A] font-bold text-lg">14% más estables</p>
            </div>
          </div>

          {/* Card 2 */}
          <div class="bg-white text-black rounded overflow-hidden max-w-sm mx-auto">
            {rightImage && (
              <img
                src={rightImage}
                alt="Parrilla de hierro fundido"
                class="w-full"
              />
            )}
            <div class="bg-white p-4">
              <p class="font-semibold text-base">Parrillas de hierro fundido</p>
              <p class="text-[#FF405A] font-bold text-lg">63% más estables</p>
            </div>
          </div>
        </div>

        {/* Texto final + CTA */}
        <p class="text-white text-base max-w-2xl mx-auto mb-6">
          Más practicidad, tecnología e innovación. <br />
          Explora nuevas técnicas culinarias y sorprende a todos.
        </p>
        <button class="bg-black text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition">
          ¡DESCUBRE MÁS!
        </button>

        {/* Rodapé legal */}
        <p class="text-xs text-white mt-8 max-w-4xl mx-auto leading-snug">
          *Resultados obtenidos tras pruebas internas en modelos Frigidaire
          FKGN20C3MYG / FKGN203SYG / FKGN20C1MYB utilizando la función
          VaporBake, comparados con los mismos modelos sin el uso de la función.
          Compruebe la disponibilidad según su región.<br />
          *Testeos internos realizados conforme a la norma European Standard
          Domestic cooking appliances burning gas - Part 1-1: Safety - General
          (Número: EN 30-1-1:2008+A3:2013 - item 5.2.8.3) comparando la
          estabilidad de las parrillas de alambrón del modelo nuevo marca
          Frigidaire - FKGN20C3MYG/ FKGN203SYG / FKGN20C1MYB con las parrillas
          flat wire del modelo - FKGH20AMPW marca Frigidaire. Compruebe la
          disponibilidad según su región.<br />
          *Testeos internos realizados conforme a la norma European Standard
          Domestic cooking appliances burning gas - Part 1-1: Safety - General
          (Número: EN 30-1-1:2008+A3:2013 - item 5.2.8.3) comparando la
          estabilidad de las parrillas de hierro fundido del modelo nuevo marca
          Frigidaire - FKGN20C3MYI / FKGN20C3SYI / FKGN20C1MYI con las parrillas
          flat wire del modelo - FKGH20AMPW marca Frigidaire. Compruebe la
          disponibilidad según su región.
        </p>
      </div>
    </Section>
  );
}
