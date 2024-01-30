import type { Product } from "./types";

export interface OutletContextType {
  openProductDrawer: () => void;
  toggleSecondaryDrawer: (component: React.ReactNode) => void;
  fetcherSubmit: fetcherSubmitType;
  setDrawerProductId: (productId: number) => void;
  products: Product[];
}

export type fetcherSubmitType = (target: any, options?: any) => void;
