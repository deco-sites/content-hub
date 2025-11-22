import { Text } from "@eluxlab/library-components";
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import CustomInfoCardSlider from "site/islands/CustomInfoCardSlider.tsx";
import { TextArea } from "apps/admin/widgets.ts";
import ResponsiveImage from "../../components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "../../types/ResponsiveImage.d.ts";

type MontageItemDesktop = {
  /**
   * @title Título
   * @default Lorem
   */
  title: string;

  /**
   * @title Texto
   * @widget text-area
   * @default Lorem
   */
  text: TextArea;

  /**
   * @title Imagem
   */
  image: IResponsiveImage;
};
/**
 * @title Seção de Montagem de fotos e textos
 * @description Exibe items com imagem, título/nome e texto em uma colagem. IMPORTANTE: este componente só funciona com três items.
 */
export interface MontageSectionProps {
  section?: ISection;
  montageItemsMobile: IInfoCardCustom[];
  montageItemsDesktop: MontageItemDesktop[];
  configs?: ISliderConfigs;
}

export default function MontageSection({
  section,
  montageItemsMobile = [],
  montageItemsDesktop = [],
  configs,
}: MontageSectionProps) {
  const id = useId();

  const sliderDefaults: ISliderConfigs = {
    loop: true,
    speed: 300,
    spaceBetween: 32,
    slidesPerView: 1,
    slidesPerViewResponsive: { mobile: 1, tablet: 1, desktop: 1 },
    customNavigation: { enabledDesktop: true, enabledMobile: false },
    customPagination: {
      enabledDesktop: true,
      enabledMobile: true,
      clickable: true,
    },
    autoplay: { enabled: false, delay: 5000 },
    ...(configs || {}),
  };

  if (!montageItemsMobile?.length || montageItemsMobile.length > 3) return null;

  return (
    <Section {...section} id={id}>
      <div id="montage-container-mobile">
        <CustomInfoCardSlider
          rootId={id}
          infoCards={montageItemsMobile}
          configs={sliderDefaults}
        />
      </div>

      <div
        id="montage-container-desktop"
        className={`grid grid-cols-2 gap-[4px] max-h-[588px]`}
      >
        <div className={`grid grid-rows-2 h-full`}>
          <div className={`grid grid-cols-2`}>
            <div className={``}>
              <ResponsiveImage
                {...montageItemsDesktop[0].image}
                sizes={{ height: 292 }}
              />
            </div>
            <div
              className={`flex flex-col justify-center items-start px-[24px] bg-[#F6F6F6]`}
            >
              <Text
                title={montageItemsDesktop[0].title}
                classes={{
                  container: "text-start font-semibold text-xl text-[#2B3227]",
                }}
              />
              <p className={`font-normal text-sm text-[#2B3227]`}>
                {montageItemsDesktop[0].text}
              </p>
            </div>
          </div>
          <div className={`grid grid-cols-2`}>
            <div
              className={`flex flex-col justify-center items-start px-[24px] bg-[#F6F6F6]`}
            >
              <Text
                title={montageItemsDesktop[1].title}
                classes={{
                  container: "text-start font-semibold text-xl text-[#2B3227]",
                }}
              />
              <p className={`font-normal text-sm text-[#2B3227]`}>
                {montageItemsDesktop[1].text}
              </p>
            </div>
            <div className={``}>
              <ResponsiveImage
                {...montageItemsDesktop[1].image}
                sizes={{ height: 292 }}
              />
            </div>
          </div>
        </div>

        <div className={`relative flex flex-col justify-end items-start`}>
          <ResponsiveImage {...montageItemsDesktop[2].image} />
          <div
            className={`absolute py-[32px] px-[40px] bg-black bg-opacity-40`}
          >
            <Text
              title={montageItemsDesktop[2].title}
              classes={{
                container: "text-start font-semibold text-[34px] text-white",
              }}
            />
            <p className={`text-start font-normal text-sm text-white`}>
              {montageItemsDesktop[2].text}
            </p>
          </div>
        </div>
      </div>
      <style>
        {`
          #montage-container-mobile {
            display: block;
          }

          #montage-container-desktop {
            display: none;
          }

          @media screen and (min-width: 1080px) {
            #montage-container-mobile {
              display: none;
            }
  
            #montage-container-desktop {
              display: grid;
            }
          }
        `}
      </style>
    </Section>
  );
}
