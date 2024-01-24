import { useRef, useState } from "react";
import type { AgGridReact } from "ag-grid-react";
import AgGridStyles from "ag-grid-community/styles/ag-grid.css";
import AgThemeQuartzStyles from "ag-grid-community/styles/ag-theme-quartz.css";
import SampleData from "../SampleData";
import { ProductStatusFilter } from "../types/enums";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import type { OutletContextType } from "../types/outletContextTypes";
import type { Product } from "../types/types";
import { json } from "@remix-run/node";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductStatusRadioFilter from "./components/ProductStatusFilter";
import ProductsTable from "./components/ProductsTable";
import ProductActionButtons from "./components/ProductsActionButtons";
import { usePollForGeneratingVersions } from "./customHooks/usePollForGeneratingVersions";
import DefaultActionFunction from "./actions/DefaultActionFunction";

export function links() {
  return [
    { rel: "stylesheet", href: AgGridStyles },
    { rel: "stylesheet", href: AgThemeQuartzStyles },
  ];
}

export async function loader() {
  return json({ products: SampleData });
}

export const action = DefaultActionFunction;

export default function ProductsPage() {
  const [products, setProducts] = useState(useLoaderData<typeof loader>().products);
  const productsRef = useRef(products);
  const { toggleMainDrawer, toggleSecondaryDrawer } = useOutletContext<OutletContextType>();
  const gridRef = useRef<AgGridReact>(null);
  const [statusType, setStatusType] = useState<ProductStatusFilter>(ProductStatusFilter.AllProducts);
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);
  const fetcher = useFetcher<typeof action>();
  const pollingForVersionIds = useRef(new Set<number>());

  usePollForGeneratingVersions(fetcher, productsRef, pollingForVersionIds, products, setProducts);

  return (
    <div className="flex flex-col ag-theme-quartz container mx-auto p-4 h-screen">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      <ProductSearchBar gridRef={gridRef} />

      <div className="flex justify-between items-end mb-4 border-b flex-wrap">
        <ProductStatusRadioFilter statusType={statusType} setStatusType={setStatusType} />
        <ProductActionButtons selectedRows={selectedRows} fetcher={fetcher} />
      </div>

      <div className="flex-grow">
        <ProductsTable
          statusType={statusType}
          gridRef={gridRef}
          setSelectedRows={setSelectedRows}
          toggleMainDrawer={toggleMainDrawer}
          toggleSecondaryDrawer={toggleSecondaryDrawer}
          products={products}
        />
      </div>
    </div>
  );
}
