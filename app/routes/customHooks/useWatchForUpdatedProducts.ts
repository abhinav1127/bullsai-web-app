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
      console.log("updatedVersions", updatedVersions);
      setProducts((currentProducts) => {
        const newProducts = currentProducts.map((product) => ({
          ...product,
          versions: product.versions.map(
            (version) => updatedVersions.find((updatedVersion: Version) => updatedVersion.id === version.id) || version
          ),
        }));

        console.log("newProducts", newProducts);
        setDrawerProduct((currentDrawerProduct) => {
          if (!currentDrawerProduct) return currentDrawerProduct;
          const updatedProduct = newProducts.find((product: Product) => product.id === currentDrawerProduct.id);
          console.log("updatedProduct", updatedProduct);
          if (!updatedProduct) return currentDrawerProduct;
          return updatedProduct;
        });

        return newProducts;
      });
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
      toast.success(`${getPastTense(versionAction)} Versions!`);
    },
    [setProducts, setPollingForVersionIds, setDrawerProduct]
  );

  useEffect(() => {
    if (!fetcher.data?.updatedVersions) return;
    console.log("updating versions", fetcher.data.updatedVersions);
    handleUpdatedVersions(fetcher.data.updatedVersions, fetcher.data.versionAction);
  }, [fetcher.data?.updatedVersions, handleUpdatedVersions, fetcher.data?.versionAction]);

  useEffect(() => {
    const intervalId = setInterval(() => pollForUpdates(), 3000);
    return () => {
      clearInterval(intervalId);
    }; // Clear interval on component unmount
  }, [pollForUpdates]);
}

export default useWatchForUpdatedProducts;
