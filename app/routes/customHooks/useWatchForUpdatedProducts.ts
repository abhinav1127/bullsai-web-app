import type { FetcherWithComponents } from "@remix-run/react";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import type { VersionAction } from "~/types/enums";
import { VersionStatus, getPastTense } from "~/types/enums";
import type { Product, Version } from "~/types/types";
import _ from "lodash";

function useWatchForUpdatedProducts(
  fetcher: FetcherWithComponents<any>,
  drawerProduct: Product | null,
  setDrawerProduct: (value: React.SetStateAction<Product | null>) => void,
  pollingForVersionIds: Set<number>,
  setPollingForVersionIds: (value: React.SetStateAction<Set<number>>) => void,
  products: Product[],
  setProducts: (value: React.SetStateAction<Product[]>) => void
) {
  const updateProducts = useCallback(
    (updatedProducts: Product[]) => {
      try {
        const idToUpdatedProduct = new Map<number, Product>();
        const generatedVersionIds = new Set<number>();
        updatedProducts.forEach((product: Product) => {
          idToUpdatedProduct.set(product.id, product);
          product.versions.forEach((version) => {
            if (version.status === VersionStatus.Generating) {
              generatedVersionIds.add(version.id);
            }
          });
        });

        setProducts((currentProducts) =>
          currentProducts.map((product: Product) =>
            idToUpdatedProduct.has(product.id) ? idToUpdatedProduct.get(product.id)! : product
          )
        );
        setPollingForVersionIds(
          (currentPollingForVersionIds) => new Set([...currentPollingForVersionIds, ...generatedVersionIds])
        );
      } catch (error) {
        console.log("error on updateProducts callback: ", error);
      }
    },
    [setProducts, setPollingForVersionIds]
  );

  useEffect(() => {
    if (!drawerProduct) {
      return;
    }
    console.log("Drawer product", drawerProduct);
    let currentProduct = products.find((product: Product) => product.id === drawerProduct.id);
    console.log("Current product", currentProduct);
    if (currentProduct && !_.isEqual(currentProduct, drawerProduct)) {
      console.log("Drawer product is updating");
      setDrawerProduct(currentProduct);
    }
  }, [products, drawerProduct, setDrawerProduct]);

  const pollForUpdates = useCallback(() => {
    if (pollingForVersionIds.size === 0) return;
    console.log("Polling...", pollingForVersionIds);
    fetcher.submit(
      {
        actionType: "pollForVersionUpdates",
        versionIDs: JSON.stringify(Array.from(pollingForVersionIds)),
      },
      { method: "POST" }
    );
  }, [fetcher, pollingForVersionIds]);

  useEffect(() => {
    if (!fetcher.data?.updatedProducts) return;
    console.log("updatedProducts", fetcher.data.updatedProducts);
    updateProducts(fetcher.data.updatedProducts);
  }, [fetcher.data?.updatedProducts, updateProducts]);

  const handleUpdatedVersions = useCallback(
    (updatedVersions: Version[], versionAction: VersionAction | undefined) => {
      setProducts((currentProducts) =>
        currentProducts.map((product) => ({
          ...product,
          versions: product.versions.map(
            (version) => updatedVersions.find((updatedVersion: Version) => updatedVersion.id === version.id) || version
          ),
        }))
      );
      // if versionAction is undefined, then we are polling for generated versions
      if (versionAction === undefined) {
        setPollingForVersionIds(
          (currentPollingForVersionIds) =>
            new Set(
              Array.from(currentPollingForVersionIds).filter(
                (versionId) => !updatedVersions.find((version) => version.id === versionId)
              )
            )
        );
      }
      toast.success(`Successfully ${getPastTense(versionAction)} Versions!`);
    },
    [setProducts, setPollingForVersionIds]
  );

  useEffect(() => {
    if (!fetcher.data?.updatedVersions) return;
    console.log("updating versions", fetcher.data.updatedVersions);
    handleUpdatedVersions(fetcher.data.updatedVersions, fetcher.data.versionAction);
  }, [fetcher.data?.updatedVersions, handleUpdatedVersions, fetcher.data?.versionAction]);

  useEffect(() => {
    const intervalId = setInterval(() => pollForUpdates(), 3000);
    console.log("intervalId", intervalId);
    return () => {
      console.log("clearing interval", intervalId);
      clearInterval(intervalId);
    }; // Clear interval on component unmount
  }, [pollForUpdates]);
}

export default useWatchForUpdatedProducts;
