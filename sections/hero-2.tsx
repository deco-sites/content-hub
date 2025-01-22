interface Props {
  /**
   * @description The description of name.
   */
  name?: string;
  /**
   * @description The color of the component.
   */
  color?: string;
}

export default function Section({ name = "Capy", color = "green" }: Props) {
  return (
    <div class={"bg-" + color + "-200 p-8 rounded-md shadow-md text-white"}>
      <h2 class="text-2xl font-semibold mb-4">Fancy Component</h2>
      <div class="space-y-4">
        <button class={"btn btn-" + color}>Click me</button>
        <input
          type="text"
          class={"input input-bordered border-" + color + "-200"}
          placeholder="Type something"
        />
        <div class={"alert bg-" + color + "-500"}>
          {name}
        </div>
      </div>
    </div>
  );
}
