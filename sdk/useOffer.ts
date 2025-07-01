import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (
    curr.priceComponentType !==
      "https://schema.org/Installment" ||
    curr.name === "Pix"
  ) {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration &&
    curr.billingDuration &&
    acc.billingDuration <
      curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};
const discountPercentage = (
  { listPrice = 0, price = 0 }: {
    listPrice?: number;
    price?: number;
  },
) => {
  const discount = Math.round(
    ((listPrice - price) / listPrice) *
      100,
  );

  if (discount === 0) return 0;

  return discount;
};

export const useOffer = (
  aggregateOffer?: AggregateOffer,
) => {
  const offer = aggregateOffer
    ?.offers[0];
  const listPrice = offer
    ?.priceSpecification.find((spec) =>
      spec.priceType ===
        "https://schema.org/ListPrice"
    );
  const installment = offer?.priceSpecification.reduce(
    bestInstallment,
    null,
  ) ??
    null;
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer
    ?.availability;
  const priceIsPix = offer
    ?.priceSpecification?.filter((
      item,
    ) => item.name === "Pix")?.[0]
    ?.price;
  const salePrice = offer
    ?.priceSpecification?.filter((
      item,
    ) =>
      item.priceType ===
        "https://schema.org/SalePrice"
    )?.[0]?.price;

  const installmentsWithInterest = offer?.priceSpecification
    ?.filter((item) =>
      item.priceComponentType ===
        "https://schema.org/Installment" &&
      item.description?.includes(
        "com juros",
      )
    )
    .reduce(
      (
        acc:
          | UnitPriceSpecification
          | null,
        curr: UnitPriceSpecification,
      ) => {
        if (!acc) return curr;

        const currBillingDuration = curr.billingDuration ?? 0;
        const accBillingDuration = acc.billingDuration ?? 0;

        if (
          currBillingDuration >
            accBillingDuration
        ) {
          return curr;
        }

        if (
          curr.billingDuration ===
            acc.billingDuration &&
          curr.price < acc.price
        ) {
          return curr;
        }

        return acc;
      },
      null,
    ) ?? null;

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    installments: {
      withoutInterest: installment,
      withInterest: installmentsWithInterest,
    },
    salePrice,
    discount: discountPercentage({
      listPrice: listPrice?.price,
      price,
    }),
    priceIsPix: salePrice && priceIsPix &&
        priceIsPix < salePrice
      ? true
      : false,
  };
};
