import type { FetcherWithComponents } from "@remix-run/react";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { VersionStatus } from "~/types/enums";
import type { Product, Version } from "~/types/types";

export function usePollForGeneratingVersions(
  fetcher: FetcherWithComponents<any>,
  pollingForVersionIds: Set<number>,
  setPollingForVersionIds: (value: React.SetStateAction<Set<number>>) => void,
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

  const handleGeneratedVersions = useCallback(
    (updatedVersions: Version[]) => {
      setProducts((currentProducts) =>
        currentProducts.map((product) => ({
          ...product,
          versions: product.versions.map(
            (version) => updatedVersions.find((updatedVersion: Version) => updatedVersion.id === version.id) || version
          ),
        }))
      );
      setPollingForVersionIds(
        (currentPollingForVersionIds) =>
          new Set(
            Array.from(currentPollingForVersionIds).filter(
              (versionId) => !updatedVersions.find((version) => version.id === versionId)
            )
          )
      );
      toast.success("Successfully Generated Versions!");
    },
    [setProducts, setPollingForVersionIds]
  );

  useEffect(() => {
    if (!fetcher.data?.updatedVersions) return;
    handleGeneratedVersions(fetcher.data.updatedVersions);
  }, [fetcher.data?.updatedVersions, handleGeneratedVersions]);

  useEffect(() => {
    const intervalId = setInterval(() => pollForUpdates(), 3000);
    console.log("intervalId", intervalId);
    return () => {
      console.log("clearing interval", intervalId);
      clearInterval(intervalId);
    }; // Clear interval on component unmount
  }, [pollForUpdates]);
}
