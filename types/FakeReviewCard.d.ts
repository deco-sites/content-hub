/**
 * @title {{#fakeProductName}}{{fakeProductName}} | {{fakePersonName}}{{/fakeProductName}}{{^fakeProductName}}Fake Review{{/fakeProductName}}
 */
export interface IFakeReviewCard {
  /**
   * @title Estrelas da Avaliação
   * @description Define a quantidade e os ícones das estrelas (cheia, vazia e meio preenchida).
   */
  fakeStars: {
    /**
     * @title Quantidade de Estrelas (Default: 5)
     * @description A quantidade total de estrelas a serem exibidas.
     * @default 5
     */
    quantity: number;

    /**
     * @title Estrela Cheia
     * @description O caminho da imagem do ícone para uma estrela cheia.
     * @default https://electrolux.vteximg.com.br/arquivos/fakereview-fullstar.svg
     */
    fullStarSrc: string;

    /**
     * @title Estrela Vazia
     * @description O caminho da imagem do ícone para uma estrela vazia.
     * @default https://electrolux.vteximg.com.br/arquivos/fakereview-emptystar.svg
     */
    emptyStarSrc: string;

    /**
     * @title Estrela Meio Preenchida
     * @description O caminho da imagem do ícone para uma estrela meio preenchida.
     * @default https://electrolux.vteximg.com.br/arquivos/fakereview-halfstar.svg
     */
    halfStarSrc: string;
  };

  /**
   * @title Descrição da Avaliação
   * @description Texto fictício da avaliação exibida no card.
   */
  fakeDescription: string;

  /**
   * @title Nome do Produto
   * @description Nome do produto associado à avaliação falsa.
   */
  fakeProductName: string;

  /**
   * @title Nome do Avaliador
   * @description Nome fictício da pessoa que escreveu a avaliação.
   */
  fakePersonName: string;

  /**
   * @hide
   */
  classes?: {
    container?: string;
    fakeStars?: string;
    fakeDescription?: string;
    fakeProductNameAndPersonName?: string;
  };

  /**
   * @hide
   */
  styles?: {
    container?: preact.JSX.AllCSSProperties;
    fakeStars?: preact.JSX.AllCSSProperties;
    fakeDescription?: preact.JSX.AllCSSProperties;
    fakeProductNameAndPersonName?: preact.JSX.AllCSSProperties;
  };
}
