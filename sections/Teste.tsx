import { Button } from "@eluxlab/library-components";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  title: string;
  /** @format rich-text */
  description: string;
}
export default function Teste({
  title = "Titulo",
  description = "lorem ipsum",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>{title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      <Icon id="ArrowLeft" size={24} />
      <>
        <Button
          onClick={() => console.log("Button clicked!")} // eslint-disable-line no-console
          label="Click me!"
        />
      </>
    </div>
  );
}
