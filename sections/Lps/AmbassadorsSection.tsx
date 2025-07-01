import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { IAmbassador } from "site/types/Ambassador.d.ts";

interface Props {
  section?: ISection;

  /**
   * @title Embaixadores
   * @description Lista de embaixadores exibidos no grid.
   */
  ambassadors?: IAmbassador[];

  /**
   * @title Ocupar toda a largura
   * @description Define se o componente deve ocupar toda a largura disponível.
   * @default false
   */
  fullWidth?: boolean;
}

export default function AmbassadorsSection({
  section,
  ambassadors = [],
  fullWidth = false,
}: Props) {
  const id = useId();

  if (!ambassadors.length) return null;

  // Define classes com base na opção "Ocupar toda a largura"
const desktopContainerClass = fullWidth
  ? "w-screen !px-0 flex flex-wrap"
  : "mx-auto flex flex-wrap";

const mobileContainerClass = fullWidth
  ? "w-screen !px-0 grid grid-cols-2 gap-0 md:hidden"
  : "grid grid-cols-2 gap-0 md:hidden mx-auto";

  return (
    <Section {...section} id={id}>
      {/* Desktop */}
      <div class={`hidden md:flex ${desktopContainerClass}`}>
        {ambassadors.map((ambassador, index) => (
          <>
            {/* Imagem */}
            <div class="h-[240px] flex-1">
              <img
                src={ambassador.imageDesktop}
                alt={ambassador.name}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Texto */}
            <div class="h-[240px] w-[183px] bg-[#002855] text-white flex flex-col justify-center p-4 shrink-0">
              <h3 class="font-bold text-lg">{ambassador.name}</h3>
              <p class="text-sm">{ambassador.description}</p>
            </div>
          </>
        ))}
      </div>

      {/* Mobile */}
      <div class={mobileContainerClass}>
        {ambassadors.map((ambassador, index) => {
          const isEven = index % 2 === 0;

          const image = (
            <div class="h-[240px] col-span-1">
              <img
                src={ambassador.imageMobile}
                alt={ambassador.name}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          );

          const text = (
            <div class="h-[240px] col-span-1 bg-[#002855] text-white flex flex-col justify-center p-4">
              <h3 class="font-bold text-lg">{ambassador.name}</h3>
              <p class="text-sm">{ambassador.description}</p>
            </div>
          );

          return (
            <>
              {isEven ? (
                <>
                  {image}
                  {text}
                </>
              ) : (
                <>
                  {text}
                  {image}
                </>
              )}
            </>
          );
        })}
      </div>
    </Section>
  );
}
