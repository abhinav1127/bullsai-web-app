import type { Product, Store } from "./types";

export interface OutletContextType {
  openProductDrawer: () => void;
  fetcherSubmit: fetcherSubmitType;
  setDrawerProductId: (productId: number) => void;
  products: Product[];
  openVersionDrawer: () => void;
  setDrawerVersionId: (versionId: number) => void;
  store: Store;
}

export type fetcherSubmitType = (target: any, options?: any) => void;
