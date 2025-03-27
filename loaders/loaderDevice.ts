import { AppContext } from "site/apps/site.ts";

export type Props = {
  device: string
}
export function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  return { ...props, device: ctx.device }
}