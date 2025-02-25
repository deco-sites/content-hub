import type {
  AggregateOffer,
  Offer,
  Product,
  ProductGroup,
  PropertyValue,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { DEFAULT_IMAGE } from "apps/commerce/utils/constants.ts";
import { pick } from "apps/vtex/utils/pickAndOmit.ts";
import type {
  Item as SkuVTEX,
  Maybe,
  Seller as SellerVTEX,
} from "apps/vtex/utils/types.ts";
import type { ProductVTEX } from "site/types/Product.d.ts";

const DEFAULT_CATEGORY_SEPARATOR = ">";

const getProductGroupURL = (
  origin: string,
  { linkText }: { linkText: string },
) => new URL(`/${linkText}/p`, origin);

const getProductURL = (
  origin: string,
  product: { linkText: string },
  skuId?: string,
) => {
  const canonicalUrl = getProductGroupURL(origin, product);

  if (skuId) {
    canonicalUrl.searchParams.set("skuId", skuId);
  }

  return canonicalUrl;
};

const nonEmptyArray = <T>(
  array: T[] | null | undefined,
) => (Array.isArray(array) && array.length > 0 ? array : null);

interface ProductOptions {
  baseUrl: string;
  priceCurrency: string;
  imagesByKey?: Map<string, string>;
  includeOriginalAttributes?: string[];
}

const getFirstItemAvailable = (item: SkuVTEX) => {
  return !!item?.sellers?.find((s) => s.commertialOffer?.AvailableQuantity > 0);
};

export const preferredSKU = (
  { items, productId }: { items: SkuVTEX[]; productId: string },
) => {
  if (productId) {
    return items?.find((item) => item.itemId === productId) ?? items?.[0];
  }

  return items?.find(getFirstItemAvailable) ?? items?.[0];
};

export const inStock = (offer: Offer) =>
  offer.availability === "https://schema.org/InStock";

export const bestOfferFirst = (a: Offer, b: Offer) => {
  if (inStock(a) && !inStock(b)) {
    return -1;
  }

  if (!inStock(a) && inStock(b)) {
    return 1;
  }

  return a.price - b.price;
};

const getHighPriceIndex = (offers: Offer[]) => {
  let it = offers.length - 1;
  for (; it > 0 && !inStock(offers[it]); it--);
  return it;
};

const splitCategory = (firstCategory: string) =>
  firstCategory.split("/").filter(Boolean);

export const toAdditionalPropertyCategory = ({
  propertyID,
  value,
}: {
  propertyID: string;
  value: string;
}): PropertyValue => ({
  "@type": "PropertyValue" as const,
  name: "category",
  propertyID,
  value,
});

export const toAdditionalPropertyCluster = (
  { propertyID, value }: { propertyID: string; value: string },
  highlights?: Set<string>,
): PropertyValue => ({
  "@type": "PropertyValue",
  name: "cluster",
  value,
  propertyID,
  description: highlights?.has(propertyID) ? "highlight" : undefined,
});

export const toAdditionalPropertyReferenceId = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): PropertyValue => ({
  "@type": "PropertyValue",
  name,
  value,
  valueReference: "ReferenceID",
});

const getImageKey = (src = "") => {
  return src;
};

export const aggregateOffers = (
  offers: Offer[],
  priceCurrency?: string,
): AggregateOffer | undefined => {
  const sorted = offers.sort(bestOfferFirst);

  if (sorted.length === 0) return;

  const highPriceIndex = getHighPriceIndex(sorted);
  const lowPriceIndex = 0;

  return {
    "@type": "AggregateOffer",
    priceCurrency,
    highPrice: sorted[highPriceIndex]?.price ?? null,
    lowPrice: sorted[lowPriceIndex]?.price ?? null,
    offerCount: sorted.length,
    offers: sorted,
  };
};

const toOriginalAttributesAdditionalProperties = (
  originalAttributes: Maybe<string[]>,
  product: ProductVTEX,
) => {
  if (!originalAttributes) {
    return [];
  }

  const attributes =
    pick(originalAttributes as Array<keyof typeof product>, product) ?? {};

  return Object.entries(attributes)?.map(([name, value]) =>
    ({
      "@type": "PropertyValue",
      name,
      value,
      valueReference: "ORIGINAL_PROPERTY" as string,
    }) as const
  ) as unknown as PropertyValue[];
};

const toOffer = ({
  commertialOffer: offer,
  sellerId,
  sellerName,
  sellerDefault,
}: SellerVTEX): Offer => ({
  "@type": "Offer",
  identifier: sellerDefault ? "default" : undefined,
  price: offer.spotPrice ?? offer.Price,
  seller: sellerId,
  sellerName,
  priceValidUntil: offer.PriceValidUntil,
  inventoryLevel: { value: offer.AvailableQuantity },
  priceSpecification: [
    {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/ListPrice",
      price: offer.ListPrice,
    },
    {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/SalePrice",
      price: offer.Price,
    },
    {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/SRP",
      price: offer.PriceWithoutDiscount,
    },
    ...offer.Installments?.map(
      (installment): UnitPriceSpecification => ({
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/SalePrice",
        priceComponentType: "https://schema.org/Installment",
        name: installment.PaymentSystemName,
        description: installment.Name,
        billingDuration: installment.NumberOfInstallments,
        billingIncrement: installment.Value,
        price: installment.TotalValuePlusInterestRate,
      }),
    ),
  ],
  availability: offer.AvailableQuantity > 0
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock",
});

export const toProduct = <P extends ProductVTEX>(
  product: P,
  sku: P["items"][number],
  level = 0, // prevent infinite loop while self referencing the product
  options: ProductOptions,
): Product => {
  const { baseUrl, priceCurrency } = options;

  const {
    brand,
    brandId,
    productName,
    productId,
    productReference,
    description,
    releaseDate,
    categories,
    items,
  } = product;

  const {
    name,
    ean,
    itemId: skuId,
    videos,
  } = sku ?? {};

  const nonEmptyVideos = nonEmptyArray(videos);
  const imagesByKey = options.imagesByKey ??
    items
      ?.flatMap((i) => i?.images)
      ?.reduce((map, img) => {
        img?.imageUrl && map.set(getImageKey(img.imageUrl), img.imageUrl);
        return map;
      }, new Map<string, string>());

  const originalAttributesAdditionalProperties =
    toOriginalAttributesAdditionalProperties(
      options.includeOriginalAttributes,
      product,
    );

  const images = nonEmptyArray(sku?.images);
  const offers = (sku?.sellers ?? [])?.map(
    toOffer,
  );

  const hasVariant = level < 1
    ? items?.map((sku) =>
      toProduct(product, sku, level + 1, { ...options, imagesByKey })
    )
    : [];

  const isVariantOf = level < 1
    ? ({
      "@type": "ProductGroup",
      productGroupID: productId,
      hasVariant,
      url: getProductGroupURL(baseUrl, product).href,
      name: productName,
      additionalProperty: [
        ...originalAttributesAdditionalProperties,
      ],
      model: productReference,
    } satisfies ProductGroup)
    : undefined;

  const finalImages = images?.map(({ imageUrl, imageText, imageLabel }) => {
    const url = imagesByKey.get(getImageKey(imageUrl)) ?? imageUrl;
    const alternateName = imageText ?? imageLabel ?? "";
    const name = imageLabel ?? "";
    const encodingFormat = "image";

    return {
      "@type": "ImageObject" as const,
      alternateName,
      url,
      name,
      encodingFormat,
    };
  }) ?? [DEFAULT_IMAGE];

  const finalVideos = nonEmptyVideos?.map((video) => {
    const url = video;
    const alternateName = "Product video";
    const name = "Product video";
    const encodingFormat = "video";
    return {
      "@type": "VideoObject" as const,
      alternateName,
      contentUrl: url,
      name,
      encodingFormat,
    };
  });

  const categoriesString = splitCategory(categories[0]).join(
    DEFAULT_CATEGORY_SEPARATOR,
  );

  return {
    "@type": "Product",
    category: categoriesString,
    productID: skuId,
    url: getProductURL(baseUrl, product, sku?.itemId ?? "").href,
    name,
    alternateName: sku?.complementName ?? "",
    description,
    brand: {
      "@type": "Brand",
      "@id": brandId?.toString(),
      name: brand,
    },
    inProductGroupWithID: productId,
    sku: skuId,
    gtin: ean,
    releaseDate,
    isVariantOf,
    image: finalImages,
    video: finalVideos,
    offers: aggregateOffers(offers, priceCurrency),
  };
};
