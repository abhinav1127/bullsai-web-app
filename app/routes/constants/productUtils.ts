import type { Product } from "~/types/types";

export const findDrawerandDefaultVersions = (products: Product[], drawerVersionId: number | null) => {
  for (let product of products) {
    for (let version of product.versions) {
      if (version.id === drawerVersionId) {
        console.log("found drawer version: ", version);
        return {
          drawerVersion: version,
          drawerDefaultVersion: product.versions.find((version) => version.id === product.defaultVersionId),
        };
      }
    }
  }
  return { drawerVersion: null, drawerDefaultVersion: null };
};
