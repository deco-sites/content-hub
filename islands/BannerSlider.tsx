import { useEffect, useState } from "preact/hooks";
import Component from "site/components/ui/Slider.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

type Props = {
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  // Detecta se o dispositivo é desktop com base no tamanho da janela
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIfDesktop = () => {
      setIsDesktop((window as Window).innerWidth >= 1024); // Define como desktop se a largura for >= 1024px
    };

    checkIfDesktop(); // Verifica na montagem
    (window as Window).addEventListener("resize", checkIfDesktop); // Atualiza ao redimensionar

    return () => (window as Window).removeEventListener("resize", checkIfDesktop); // Remove o listener ao desmontar
  }, []);
  
  const { pagination, navigation, slidesPerViewResponsive } = configs ?? {};

  const sliderConfig = {
    ...configs,
    slidesPerView: slidesPerViewResponsive?.mobile ?? 1,
    pagination: {
      enabled: isDesktop ? pagination?.enabledDesktop : pagination?.enabledMobile,
    },
    navigation: {
      enabled: isDesktop ? navigation?.enabledDesktop : navigation?.enabledMobile,
    },
    breakpoints: {
      768: {
        slidesPerView: slidesPerViewResponsive?.tablet ?? 1
      },
      1024: {
        slidesPerView: slidesPerViewResponsive?.desktop ?? 1,
        pagination: {
          enabled: pagination?.enabledDesktop
        }
      }
    }
  } as ISliderConfigs;


  const slides = banners.map((props, idx) => {
    return <ResponsiveImage {...props} key={`${props.alt}-${idx}`} />;
  });

  return <Component configs={sliderConfig} slides={slides} rootId={rootId} />;
}

export default Island;
