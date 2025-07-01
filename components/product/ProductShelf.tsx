import ProductCard from "site/components/product/ProductCard.tsx";
import Slider from "site/components/ui/Slider.tsx";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import type { Product } from "apps/commerce/types.ts";

export type Props = {
  products?: Partial<Product>[];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function ProductShelf({
  products = [],
  configs = {},
  rootId,
}: Props): preact.JSX.Element {
  const slides = products.map((
    props,
  ) => (
    <ProductCard
      key={props.productID}
      {...props}
    />
  ));

  return (
    <Slider
      configs={{ ...configs }}
      slides={slides}
      rootId={rootId}
    />
  );
}
