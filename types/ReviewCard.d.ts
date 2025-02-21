/**
 * @title {{#reviewProductName}}{{reviewProductName}} | {{reviewPersonName}}{{/reviewProductName}}{{^reviewProductName}}Review{{/reviewProductName}}
 */
export interface IReviewCard {
  /**
   * @title Estrelas da Avaliação
   * @description Define a quantidade e os ícones das estrelas (cheia, vazia e meio preenchida).
   */
  reviewStars: {
    /**
     * @title Quantidade de Estrelas (Default: 5)
     * @description A quantidade total de estrelas a serem exibidas.
     * @default 5
     */
    quantity: number;

    /**
     * @title Estrela Cheia
     * @description O caminho da imagem do ícone para uma estrela cheia.
     * @format image-uri
     * @default https://electrolux.vteximg.com.br/arquivos/reviewrcard-fullstar.svg
     */
    fullStarSrc: string;

    /**
     * @title Estrela Vazia
     * @description O caminho da imagem do ícone para uma estrela vazia.
     * @format image-uri
     * @default https://electrolux.vteximg.com.br/arquivos/reviewrcard-halfstar.svg
     */
    emptyStarSrc: string;

    /**
     * @title Estrela Meio Preenchida
     * @description O caminho da imagem do ícone para uma estrela meio preenchida.
     * @format image-uri
     * @default https://electrolux.vteximg.com.br/arquivos/reviewrcard-emptystar.svg
     */
    halfStarSrc: string;
  };

  /**
   * @title Descrição da Avaliação
   * @description Texto fictício da avaliação exibida no card.
   */
  reviewDescription: string;

  /**
   * @title Nome do Produto
   * @description Nome do produto associado à avaliação falsa.
   */
  reviewProductName: string;

  /**
   * @title Nome do Avaliador
   * @description Nome fictício da pessoa que escreveu a avaliação.
   */
  reviewPersonName: string;

  /**
   * @hide
   */
  classes?: {
    container?: string;
    reviewStars?: string;
    reviewDescription?: string;
    reviewProductNameAndPersonName?: string;
  };

  /**
   * @hide
   */
  styles?: {
    container?: preact.JSX.AllCSSProperties;
    reviewStars?: preact.JSX.AllCSSProperties;
    reviewDescription?: preact.JSX.AllCSSProperties;
    reviewProductNameAndPersonName?: preact.JSX.AllCSSProperties;
  };
}
