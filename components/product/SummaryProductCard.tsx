import Icon from "site/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import ProductSpecificationComparator from "site/components/product/ProductSpecificationComparator.tsx";
import { formatPrice } from "site/sdk/format.ts";
import { relative } from "site/sdk/url.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import type { ProductWithComparator } from "site/types/Product.d.ts";

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
    <div class="flex flex-col w-full py-[16px] px-[20px] border-[1px] border-solid border-[#dee7ea] bg-white rounded box-border group xl:transition-all xl:ease-in-out xl:duration-200">
      <div class="flex gap-x-[16px]">
        <div class="w-full">
          <figure class="relative overflow-hidden aspect-square">
            <a href={url && relative(url)} class="grid grid-cols-1 w-full group"
            >
              <Image
                src={front?.url!}
                alt={front?.alternateName}
                class="bg-base-100 col-span-full row-span-full rounded w-full"
                width={60}
                height={60}
                widthMobile={60}
                heightMobile={60}
              />
              <Image
                src={back?.url ?? front?.url!}
                alt={back?.alternateName ?? front?.alternateName}
                class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 xl:group-hover:opacity-100"
                width={60}
                height={60}
                widthMobile={60}
                heightMobile={60}
              />
            </a>
          </figure>
        </div>

        <div class="flex flex-col gap-y-[8px]">
          <h2 title={isVariantOf?.name} class="text-sm text-left font-semibold leading-[20px] text-[#011e41] text-wrap truncate line-clamp-3 xl:text-base xl:font-bold">
            {isVariantOf?.name}
          </h2>

          <div class="flex flex-col mb-4">
            {
              listPrice < price ? <span class="flex h-full text-sm text-left line-through text-[#5b6a78] leading-[initial] min-h-[16px]">
                {formatPrice(
                  listPrice,
                  offers!.priceCurrency!,
                )}
              </span> : null
            }

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
      <div class="flex items-center w-full xl:transition-all xl:ease-in-out xl:duration-200 xl:invisible xl:opacity-0 xl:group-hover:visible xl:group-hover:opacity-100">
        <a class="flex w-full rounded cursor-pointer no-underline items-center justify-center h-[40px] font-semibold text-white bg-[#617f57] transition-all ease-in duration-300 hover:bg-[#99b293]">
          Ver Detalhes
        </a>
      </div>
    </div>
  );
}
