import type { FetcherWithComponents } from "@remix-run/react";
import type { Product } from "./types";

export interface OutletContextType {
  openMainDrawer: () => void;
  toggleSecondaryDrawer: (component: React.ReactNode) => void;
  fetcher: FetcherWithComponents<any>;
  setDrawerProduct: (product: Product) => void;
  products: Product[];
}
