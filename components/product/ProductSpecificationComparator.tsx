import Image from "apps/website/components/Image.tsx";
import type { ProductSpecsComparator } from "site/types/Product.d.ts";

interface Props {
  productSpecsComparator?: ProductSpecsComparator[];
}

export default function ProductSpecificationComparator({
  productSpecsComparator = []
}: Props): preact.JSX.Element {
  return (
    <div class="flex w-full mt-4">
      <div class="flex w-full flex-col">
        {productSpecsComparator.map(
          ({ name, value, icon, hasSpec = false }, idx) => {
            return (
              <div
                class={`flex w-full items-center justify-between gap-2 min-h-[88px] ${
                  idx < productSpecsComparator?.length - 1
                    ? "border-b border-[#E1E8EB]"
                    : ""
                } ${!hasSpec ? "opacity-70" : "opacity-100"}`}
                key={name}
              >
                <div class="flex items-center gap-4">
                  <div class="flex w-10 h-10">
                    {icon && (
                      <Image
                        width={40}
                        height={40}
                        class="flex w-full h-full"
                        src={icon}
                      />
                    )}
                  </div>
                  <div class="flex w-[calc(100%-56px)]">
                    <span class="text-base font-semibold text-[#03183F]">
                      {name}
                    </span>
                  </div>
                </div>

                <div class="flex">
                  <span class="text-sm font-semibold text-[#03183F]">
                    {value ?? ""}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
