import { DemoGeneratingVersionsArr } from "./SampleData";
import { ProductAction, ProductStatus } from "./types/enums";
import type { Product } from "./types/types";

export const performProductAction = async (products: Product[], action: ProductAction): Promise<Product[]> => {
  switch (action) {
    case ProductAction.Activate:
      return activateProducts(products);
    case ProductAction.Deactivate:
      return deactivateProducts(products);
    default:
      console.error("Unknown action, returning products as is", action);
      return products;
  }
};

const activateProducts = (products: Product[]): Product[] => {
  return products
    .filter((product) => {
      return product.status === ProductStatus.Inactive;
    })
    .map((product) => {
      // If the product is active and has a non-default version, just change the product status
      if (product.status === ProductStatus.Inactive && product.versions.length > 1) {
        return {
          ...product,
          status: ProductStatus.Active,
        };
      }

      return {
        ...product,
        status: ProductStatus.Active,
        versions: product.versions.concat(DemoGeneratingVersionsArr),
      };
    });
};

const deactivateProducts = (products: Product[]): Product[] => {
  return products
    .filter((product) => {
      return product.status === ProductStatus.Active;
    })
    .map((product) => ({
      ...product,
      status: ProductStatus.Inactive,
    }));
};
