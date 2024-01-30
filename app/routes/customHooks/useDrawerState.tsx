import { useCallback, useMemo, useState } from "react";
import type { Product } from "~/types/types";
import { findDrawerandDefaultVersions } from "../constants/productUtils";

function useDrawerState(products: Product[]) {
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [isVersionDrawerOpen, setIsVersionDrawerOpen] = useState(false);
  const [drawerProductId, setDrawerProductId] = useState<number | null>(null);
  const [drawerVersionId, setDrawerVersionId] = useState<number | null>(null);

  const openProductDrawer = useCallback(() => {
    setIsProductDrawerOpen(true);
  }, []);

  const openVersionDrawer = useCallback(() => {
    setIsVersionDrawerOpen(true);
  }, []);

  const closeProductDrawer = useCallback(() => {
    setIsProductDrawerOpen(false);
  }, []);

  const closeVersionDrawer = useCallback(() => {
    setIsVersionDrawerOpen(false);
  }, []);

  const drawerProduct: Product | null = useMemo(() => {
    if (!drawerProductId) {
      return null;
    }
    return products.find((product: Product) => product.id === drawerProductId) ?? null;
  }, [drawerProductId, products]);
  const { drawerVersion, drawerDefaultVersion } = useMemo(() => {
    return findDrawerandDefaultVersions(products, drawerVersionId);
  }, [drawerVersionId, products]);

  return {
    isProductDrawerOpen,
    isVersionDrawerOpen,
    drawerProductId,
    drawerVersionId,
    drawerProduct,
    drawerVersion,
    drawerDefaultVersion,
    openProductDrawer,
    openVersionDrawer,
    closeProductDrawer,
    closeVersionDrawer,
    setDrawerProductId,
    setDrawerVersionId,
  };
}

export default useDrawerState;
