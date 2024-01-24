import type { FetcherWithComponents } from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";
import { VersionStatus } from "~/types/enums";
import type { Product, Version } from "~/types/types";

export function usePollForGeneratingVersions(
  fetcher: FetcherWithComponents<any>,
  productsRef: React.MutableRefObject<Product[]>,
  pollingForVersionIds: React.MutableRefObject<Set<number>>,
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) {
  const updateProducts = useCallback(
    (idsToUpdatedProducts: Map<number, Product>) => {
      try {
        setProducts(
          products.map((product: Product) =>
            idsToUpdatedProducts.has(product.id) ? idsToUpdatedProducts.get(product.id)! : product
          )
        );
      } catch (error) {
        console.log("error on updateProducts callback: ", error);
      }
    },
    [products, setProducts]
  );
  const updateProductsRef = useRef(updateProducts);
  useEffect(() => {
    updateProductsRef.current = updateProducts;
  }, [updateProducts]);

  const pollForUpdates = useCallback(() => {
    if (pollingForVersionIds.current.size === 0) return;
    console.log("Polling...", pollingForVersionIds.current);
    fetcher.submit(
      {
        actionType: "pollForVersionUpdates",
        versionIDs: JSON.stringify(Array.from(pollingForVersionIds.current)),
      },
      { method: "POST" }
    );
  }, [fetcher, pollingForVersionIds]);

  useEffect(() => {
    if (!fetcher.data?.updatedProducts) return;

    const idToUpdatedProduct = new Map<number, Product>();
    const generatedVersionIds = new Set<number>();
    fetcher.data.updatedProducts.forEach((product: Product) => {
      idToUpdatedProduct.set(product.id, product);
      product.versions.forEach((version) => {
        if (version.status === VersionStatus.Generating) {
          generatedVersionIds.add(version.id);
        }
      });
    });

    updateProductsRef.current(idToUpdatedProduct);
    pollingForVersionIds.current = new Set([...pollingForVersionIds.current, ...generatedVersionIds]);
  }, [fetcher.data?.updatedProducts, updateProductsRef, pollingForVersionIds]);

  useEffect(() => {
    if (!fetcher.data?.updatedVersions) return;

    const updatedProducts = productsRef.current.map((product) => ({
      ...product,
      versions: product.versions.map(
        (version) =>
          fetcher.data.updatedVersions.find((updatedVersion: Version) => updatedVersion.id === version.id) || version
      ),
    }));

    setProducts(updatedProducts);
  }, [fetcher.data?.updatedVersions, setProducts, productsRef]);

  useEffect(() => {
    const intervalId = setInterval(() => pollForUpdates(), 3000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [pollForUpdates]); // Empty dependency array ensures this effect runs only once
}
