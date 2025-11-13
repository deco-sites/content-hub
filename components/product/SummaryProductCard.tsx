import Icon from "site/components/ui/Icon.tsx";
import { formatPrice } from "site/sdk/format.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import type { ProductWithComparator } from "site/types/Product.d.ts";

export default function SummaryProductCard(
  props: Partial<ProductWithComparator>,
): preact.JSX.Element | null {
  const {
    url,
    isVariantOf,
    offers,
  } = props ?? {};

  const {
    listPrice,
    price,
    priceIsPix,
  } = useOffer(offers);

  if (!url) return null;

  return (
    <div class="flex flex-col w-full py-[16px] px-[20px] border-[1px] border-solid border-[#dee7ea] bg-white rounded box-border group xl:transition-all xl:ease-in-out xl:duration-200">
      <div class="flex gap-x-[16px]">
        <div class="flex flex-col gap-y-[8px]">
          <h2
            title={isVariantOf?.name}
            class="text-sm text-left font-semibold leading-[20px] text-[#011e41] text-wrap truncate line-clamp-3 xl:text-base xl:font-bold"
          >
            {isVariantOf?.name}
          </h2>

          <div class="flex flex-col mb-4">
            {listPrice && price && listPrice < price
              ? (
                <span class="flex h-full text-sm text-left line-through text-[#5b6a78] leading-[initial] min-h-[16px]">
                  {formatPrice(
                    listPrice,
                    offers!.priceCurrency!,
                  )}
                </span>
              )
              : null}

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
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full xl:h-0 xl:transition-all xl:ease-in-out xl:duration-200 xl:invisible xl:opacity-0 xl:group-hover:h-auto xl:group-hover:visible xl:group-hover:opacity-100">
        <a class="flex w-full rounded cursor-pointer no-underline items-center justify-center h-[40px] font-semibold text-white bg-[#617f57] transition-all ease-in duration-300 hover:bg-[#99b293]">
          Ver Detalhes
        </a>
      </div>
    </div>
  );
}
