import { asset } from "$fresh/runtime.ts";

export type AvailableIcons =
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "MagnifyingGlass"
  | "MapPin"
  | "Mastercard"
  | "Message"
  | "Minus"
  | "Phone"
  | "Pinterest"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "Youtube"
  | "Zoom"
  | "Shield"
  | "Tool"
  | "Cashback"
  | "Likephone"
  | "Store";

interface IconProps extends
  preact.JSX.SVGAttributes<
    SVGSVGElement
  > {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

export default function Icon({
  id,
  strokeWidth = 1,
  size,
  width,
  height,
  style = { color: "#ADB9C3" },
  ...otherProps
}: IconProps): preact.JSX.Element {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
      style={style}
    >
      <use
        href={asset(
          `/sprites.svg#${id}`,
        )}
      />
    </svg>
  );
}
