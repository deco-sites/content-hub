import { InfoCard } from "@eluxlab/library-components";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Iframe from "site/components/ui/Iframe.tsx";

interface Props {
  /** @format rich-text */
  description?: string;
  /**
   * @title Imagem ou Video? */
  typeOfContent?: "Imagem" | "Video";
  imagem?: {
    src: ImageWidget;
    alt: string;
  };
  video?: VideoWidget;
  /**
   * @title Texto ao lado esquerdo?
   * @description Ao deixar ativo, o texto ficará ao lado esquerdo */
  left?: boolean;
}
export default function InfoCardComponent({
  description = "lorem ipsum",
  typeOfContent = "Imagem",
  imagem = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/772e246e-1959-46ac-a309-3f25ab20af6f",
    alt: "Imagem",
  },
  video = "",
  left = false,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <InfoCard
        richText={description}
        left={left}
        classes={{ children: "vtex-info-card-0-x-content" }}
      >
        {typeOfContent === "Video" ? (
          <Iframe src={video}></Iframe>
        ) : (
          <Image
            width={640}
            height={640}
            class="object-fit z-10 w-full h-auto"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={imagem.src}
            alt={imagem.alt}
            decoding="async"
            loading="lazy"
          />
        )}
      </InfoCard>
    </div>
  );
}
