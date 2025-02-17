import InfoCard from "site/components/ui/InfoCard.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type {
  IInfoCard,
  IInfoCardImage,
  IInfoCardVideo,
} from "site/types/InfoCard.d.ts";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @description Componente de seção contendo um cartão informativo.
 */
interface Props {
  /**
   * @title Configuração da Seção
   * @description Define o título, subtítulo e espaçamento da seção.
   */
  section?: ISection;

  /**
   * @title Cartão Informativo
   * @description Define o conteúdo e as configurações do cartão informativo exibido na seção.
   */
  infoCard?: IInfoCard;
}

export default function InfoCardSection({ section, infoCard }: Props) {
  const id = useId();

  const { typeOfContent } = infoCard ?? {};

  const typeOfContentVideo = typeOfContent as IInfoCardVideo;
  const typeOfContentImage = typeOfContent as IInfoCardImage;
  const isVideo = !!typeOfContentVideo?.src;

  const enrichedTypeOfContent = isVideo
    ? {
        ...typeOfContentVideo,
        iframeProps: {
          ...typeOfContentVideo?.iframeProps,
          className: infoCard?.classes?.children,
          id: `iframe-${id}`,
          width: "100%",
          height: 537,
          style: { border: "none" },
          allow: typeOfContentVideo?.autoplay ? "autoplay" : "",
          allowFullScreen: true,
        },
      }
    : typeOfContentImage;

  return (
    <Section {...section} id={id} classesContainer="info-card-section">
      <div class="flex w-full h-full bg-[#F6F6F6]">
        <InfoCard
          {...infoCard}
          typeOfContent={enrichedTypeOfContent}
          classes={{
            container: `w-full info-card ${
              infoCard?.direction === "left" ? "flex-row" : "flex-row-reverse"
            }`,
            children: "info-card-children h-full",
          }}
        />
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[570px] lg:h-[500px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
