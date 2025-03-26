import { lazy, Suspense } from "preact/compat";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

// Lazy load do Slider
const LazySlider = lazy(() => import("site/components/ui/Slider.tsx"));

type Props = {
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ banners = [], configs = {}, rootId }: Props) {
  const slides = banners.map((props, idx) => {
    return <ResponsiveImage {...props} key={`${props.alt}-${idx}`} />;
  });

  return (
    <Suspense fallback={<div>Carregando slider...</div>}>
      <LazySlider configs={configs} slides={slides} rootId={rootId} />
    </Suspense>
  );
}

export default Island;