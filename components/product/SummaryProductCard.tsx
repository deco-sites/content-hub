import Icon from "site/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import ProductSpecificationComparator from "site/components/product/ProductSpecificationComparator.tsx";
import { formatPrice } from "site/sdk/format.ts";
import { relative } from "site/sdk/url.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import type { ProductWithComparator } from "site/types/Product.d.ts";

const WIDTH = 230;
const HEIGHT = 230;

export default function SummaryProductCard(
  props: Partial<ProductWithComparator>,
): preact.JSX.Element | null {
  const {
    url,
    isVariantOf,
    offers,
    image: images,
    productSpecsComparator,
  } = props ?? {};

  const [front, back] = images ?? [];
  const {
    listPrice,
    price,
    discount,
    priceIsPix,
    salePrice,
    installments: {
      withInterest,
      withoutInterest,
    },
  } = useOffer(offers);

  if (!url) return null;

  return (
    <div class="flex border-[1px] border-solid border-[#dee7ea] bg-white rounded box-border min-h-[540px] group md:min-h-[480px] lg:min-h-[520px] xl:transition-all xl:ease-in-out xl:duration-200">
      <div class="flex flex-col gap-2 w-full h-full p-4">
        <div class="flex relative w-full items-center justify-center">
          <div class="flex absolute left-0 top-0 cursor-pointer z-[5]">
            <Icon
              id="Heart"
              width={20}
              height={19}
              strokeWidth="1.5"
              style={{
                color: "#041E50",
              }}
            />
          </div>

          <div class="flex w-full h-full justify-center max-w-[230px] max-h-[230px]">
            <figure
              class="relative overflow-hidden"
              style={{
                aspectRatio: `${WIDTH} / ${HEIGHT}`,
              }}
            >
              <a
                href={url &&
                  relative(url)}
                aria-label="view product"
                class="grid grid-cols-1 grid-rows-1 w-full group"
              >
                <Image
                  src={front?.url!}
                  alt={front
                    ?.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class="bg-base-100 col-span-full row-span-full rounded w-full"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  preload={false}
                  loading="lazy"
                  decoding="async"
                />
                <Image
                  src={back?.url ??
                    front?.url!}
                  alt={back
                    ?.alternateName ??
                    front
                      ?.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 xl:group-hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </figure>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex min-h-[60px] lg:min-h-[72px] mb-4">
            <h2
              title={isVariantOf?.name}
              class="text-sm text-left font-semibold leading-[20px] text-[#011e41] text-wrap truncate line-clamp-3 xl:text-base xl:font-bold"
            >
              {isVariantOf?.name}
            </h2>
          </div>

          <div class="flex flex-col mb-4">
            <span class="flex h-full text-sm text-left line-through text-[#5b6a78] leading-[initial] min-h-[16px]">
              {formatPrice(
                listPrice,
                offers!.priceCurrency!,
              )}
            </span>

            <div class="flex gap-2 items-center">
              <span class="flex items-center h-full text-xl text-left font-semibold text-[#011e41] leading-[24px] min-h-[24px] gap-1">
                {formatPrice(
                  price,
                  offers!
                    .priceCurrency!,
                )}
                {priceIsPix && (
                  <span class="text-sm leading-[initial] flex items-center gap-1">
                    no{" "}
                    <Icon
                      id="Pix"
                      width={12}
                      height={12}
                      style={{
                        color: "#32BCAD",
                      }}
                    />
                    <b class="font-semibold">
                      Pix
                    </b>
                  </span>
                )}
              </span>
              {!priceIsPix &&
                discount !== 0 && (
                  <span class="flex items-center justify-center h-[22px] bg-[#bc8817] font-semibold text-white rounded leading-[initial] text-xs min-w-[48px] w-fit">
                    {discount}%
                  </span>
                )}
            </div>

            <div class="h-[22px] flex gap-1 items-center mb-1">
              {priceIsPix &&
                salePrice && (
                  <span class="text-[#5b6a78] text-sm leading-[initial]">
                    ou{" "}
                    <b>
                      {formatPrice(
                        salePrice,
                        offers!
                          .priceCurrency!,
                      )}
                    </b>
                  </span>
                )}
              {priceIsPix &&
                discount !== 0 && (
                  <span class="flex items-center justify-center h-[22px] bg-[#bc8817] font-semibold text-white rounded leading-[initial] text-xs min-w-[48px] w-fit">
                    -{discount}%
                  </span>
                )}
            </div>

            {/* <div class="flex flex-col min-h-[60px] lg:min-h-[80px]"> */}
            {/* {withoutInterest && (
                <span class="text-[#5b6a78] text-sm">
                  em até{" "}
                  <b>
                    {withoutInterest
                      .billingDuration}x
                  </b>{" "}
                  de{" "}
                  <b>
                    {formatPrice(
                      withoutInterest
                        .price,
                      offers!
                        .priceCurrency!,
                    )}
                    {" "}
                  </b>
                  sem juros
                </span>
              )} */}
            {/* {withInterest && (
                <span class="text-[#5b6a78] text-sm">
                  {withoutInterest ? "ou" : "em até"}{" "}
                  <b>
                    {withInterest
                      .billingDuration}x
                  </b>{" "}
                  de{" "}
                  <b>
                    {formatPrice(
                      withInterest
                        .price,
                      offers!
                        .priceCurrency!,
                    )}
                    {" "}
                  </b>
                  com juros
                </span>
              )} */}
            {/* </div> */}
          </div>

          <div class="flex items-center w-full xl:transition-all xl:ease-in-out xl:duration-200 xl:invisible xl:opacity-0 xl:group-hover:visible xl:group-hover:opacity-100">
            <a
              title="Ver detalhes"
              class="flex w-full rounded cursor-pointer no-underline items-center justify-center h-[40px] font-semibold text-white bg-[#617f57] transition-all ease-in duration-300 hover:bg-[#99b293]"
            >
              Ver Detalhes
            </a>
          </div>
          {/* {!!productSpecsComparator
            ?.length && (
              <div class="flex">
                <ProductSpecificationComparator
                  productSpecsComparator={productSpecsComparator}
                />
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
}
