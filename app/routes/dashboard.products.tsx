import { useRef, useState } from "react";
import type { AgGridReact } from "ag-grid-react";
import AgGridStyles from "ag-grid-community/styles/ag-grid.css";
import AgThemeQuartzStyles from "ag-grid-community/styles/ag-theme-quartz.css";
import SampleData from "../SampleData";
import type { ProductAction } from "../types/enums";
import { ProductStatusFilter } from "../types/enums";
import { Tooltip } from "react-tooltip";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import type { OutletContextType } from "../types/outletContextTypes";
import type { Product } from "../types/types";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { performProductAction } from "~/productActions.server";
import { pollForVersionUpdates } from "~/versionActions";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductStatusRadioFilter from "./components/ProductStatusFilter";
import ProductsTable from "./components/ProductsTable";
import ProductActionButtons from "./components/ProductsActionButtons";
import { usePollForGeneratingVersions } from "./customHooks/usePollForGeneratingVersions";

export function links() {
  return [
    { rel: "stylesheet", href: AgGridStyles },
    { rel: "stylesheet", href: AgThemeQuartzStyles },
  ];
}

export async function loader() {
  return json({ products: SampleData });
}

export const action: ActionFunction = async (props) => {
  const request = props.request;
  const formData = new URLSearchParams(await request.text());
  const actionType = formData.get("actionType");
  console.log("formData: ", formData);

  try {
    switch (actionType) {
      case "performProductAction":
        const updatedProducts = await performProductAction(
          JSON.parse(formData.get("products")!),
          formData.get("productStatusAction") as ProductAction
        );
        console.log("updatedProducts: ", updatedProducts);
        return json({ updatedProducts: updatedProducts }, { status: 200 });
      case "pollForVersionUpdates":
        const updatedVersions = await pollForVersionUpdates(JSON.parse(formData.get("versionIDs")!));
        return json({ updatedVersions: updatedVersions }, { status: 200 });
      default:
        return json({});
    }
  } catch (error) {
    console.log("error on action: ", actionType, error);
    return json({ error: error }, { status: 400 });
  }
};

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

      <Tooltip id="my-tooltip" />
    </div>
  );
}
