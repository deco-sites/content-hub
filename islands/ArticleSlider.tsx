import Article from "site/components/ui/Article.tsx";
import Component from "site/components/ui/Slider.tsx";
import type { IArticle } from "site/types/Article.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

type Props = {
  articles?: IArticle[];
  configs?: ISliderConfigs;
  rootId: string;
};

function Island({ articles = [], configs = {}, rootId }: Props) {
  const slides = articles.map((props, idx) => (
    <Article key={`${props.image.alt}-${idx}`} {...props} />
  ));

  return <Component configs={{ ...configs }} slides={slides} rootId={rootId} />;
}

export default Island;
