import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";

interface Category {
  name?: string;
  image?: IResponsiveImage;
}

interface CategoriesGridSectionProps {
  section?: ISection;
  categories?: Category[];
}

export default function CategoriesGridSection(
  { section, categories }: CategoriesGridSectionProps,
) {
  if (categories.length === 0 || categories.length > 6) return null;

  // <div>
  //   {categories.map((category, index)=>(
  //     {category.image.src.mobile<div>
  //       <ResponsiveImage  />
  //     </div>:null}
  //   ))}
  // </div>
  return null;
}
