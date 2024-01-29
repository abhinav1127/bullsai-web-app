import type { Product } from "./types";

export interface OutletContextType {
  openMainDrawer: () => void;
  toggleSecondaryDrawer: (component: React.ReactNode) => void;
  fetcherSubmit: fetcherSubmitType;
  setDrawerProduct: (product: Product) => void;
  products: Product[];
}

export type fetcherSubmitType = (target: any, options?: any) => void;
