import Slider from "site/components/ui/Slider.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import productByIdLoader from "../loaders/customVTEX/productById.ts";
import { PRODUCT_QUERY } from "../loaders/customVTEX/productById.ts";

type BannerSliderProps = {
  banners?: IResponsiveImage[];
  productIds?: string[];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function BannerSlider(
  {
    banners = [],
    productIds = [],
    configs = {},
    rootId,
  }: BannerSliderProps,
) {
  const productsArray = productIds && productIds.map(productId => productByIdLoader(productId, PRODUCT_QUERY,))

  const slides = banners.map(
    (banner, idx) => {
      return (
        <div className={`flex flex-column justify-center items-center`}>
          <ResponsiveImage
            {...banner}
            key={`${banner.alt}-${idx}`}
          />
          <div className={`flex flex-column justify-center items-center`}>
            {productsArray.length ? productsArray.map((product, index) => {
              return (
                <div className={`flex flex-column justify-center items-center`}>
                  <ResponsiveImage
                    {...p}
                    key={`${product.p}-${index}`}
                  />
                  <p>{product.name}</p>
                </div>
              )
            }) : null
            }
          </div>
        </div>
      );
    },
  );

  return (
    <Slider
      configs={configs}
      slides={slides}
      rootId={rootId}
    />
  );
}
