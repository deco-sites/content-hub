import { preferredSKU, toProduct } from "site/utils/transform.ts";
import { AppContext } from "apps/vtex/mod.ts";
import type { ProductVTEX } from "site/types/Product.d.ts";
import type { Product } from "apps/commerce/types.ts";

/**
 * @title ID do produto
 */
export type ProductById = Product;

/**
 * @title Escolha uma opção
 */
export type NullReturn = null;

interface ProductQueryResponse {
  product: ProductVTEX;
}

interface ProductQueryVariable {
  identifier: {
    field:
      | "id"
      | "slug"
      | "ean"
      | "reference"
      | "sku";
    value: string;
  };
}

export interface Props {
  productId: string;
}

const PRODUCT_QUERY = `
query product($identifier: ProductUniqueIdentifier) {
  product(identifier: $identifier) @context(provider: "vtex.search-graphql") {
    brand
    brandId
    productName
    productId
    productReference
    description
    releaseDate
    categories
    items {
      itemId
      name
      complementName
      ean
      images {
        imageLabel
        imageUrl
        imageText
      }
      videos { videoUrl }
      sellers {
        sellerId
        sellerName
        addToCartLink
        sellerDefault
        commertialOffer {
          Installments {
            Value
            InterestRate
            TotalValuePlusInterestRate
            NumberOfInstallments
            PaymentSystemName
            PaymentSystemGroupName
            Name
          }
          Price
          ListPrice
          spotPrice
          PriceWithoutDiscount
          PriceValidUntil
          AvailableQuantity
        }
      }
      variations {
        originalName
        name
        values
      }
      estimatedDateArrival
    }
    link
    linkText
    categoryId
    clusterHighlights { id name }
    productClusters { id name }
  }
}
`;

async function loader(
  { productId }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<ProductById | NullReturn> {
  const { invoke: { vtex }, defaultSegment } = ctx;
  const { io } = await vtex.loaders.config();

  const priceCurrency = defaultSegment?.currencyCode ?? "BRL";

  try {
    const { product } = await io.query<
      ProductQueryResponse,
      ProductQueryVariable
    >({
      operationName: "product",
      variables: { identifier: { field: "id", value: productId } },
      query: PRODUCT_QUERY,
    }) as ProductQueryResponse;

    if (!product) {
      return null;
    }

    const mappedProduct = toProduct(
      product,
      preferredSKU({ items: product.items, productId }),
      0,
      {
        baseUrl: "https://loja.electrolux.com.br/",
        priceCurrency,
      },
    );

    return mappedProduct;
  } catch {
    return null;
  }
}

export default loader;
