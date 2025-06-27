import type { ImageWidget } from "apps/admin/widgets.ts";

export interface IAmbassador {
    imageDesktop: ImageWidget;
    imageMobile: ImageWidget;
    name: string;
    description: string;
}
