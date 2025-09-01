import type { AvailableIcons } from "site/components/ui/Icon.tsx";

/**
 * @title {{#id}}{{id}}{{/id}}{{^id}}Ícone{{/id}}
 */
export interface Icon {
   /**
   * @title Ícone
   */
  id: AvailableIcons;
  /**
  * @title URL 
  * @description Para onde deve haver direcionamento do usuário
  */
  href: string;
}