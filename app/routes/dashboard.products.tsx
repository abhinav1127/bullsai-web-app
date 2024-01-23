import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AgGridStyles from "ag-grid-community/styles/ag-grid.css";
import AgThemeQuartzStyles from "ag-grid-community/styles/ag-theme-quartz.css";
import SampleData from "../SampleData";
import { ProductAction, ProductStatus, VersionStatus } from "../types/enums";
import { Tooltip } from "react-tooltip";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import type { OutletContextType } from "../types/outletContextTypes";
import { colDefs, defaultColDef } from "./constants/tableConstants";
import ProductView from "./components/ProductView";
import type { Product, Version } from "../types/types";
import { ActionButton } from "./components/Buttons";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { performProductAction } from "~/productActions.server";
import { toast } from "react-toastify";
import { pollForVersionUpdates } from "~/versionActions";

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
  const [statusType, setStatusType] = useState("All Products");
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);
  const fetcher = useFetcher<typeof action>();
  const pollingForVersionIds = useRef(new Set<number>());

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (document.getElementById("filter-text-box") as HTMLInputElement).value;
    gridRef.current?.api.setGridOption("quickFilterText", filterValue);
  }, []);

  const externalFilterChanged = useCallback((newValue: string) => {
    setStatusType(newValue);
  }, []);

  const isExternalFilterPresent = useCallback(() => {
    return statusType !== "All Products";
  }, [statusType]);

  const doesExternalFilterPass = useCallback(
    (node) => {
      if (node.data) {
        return node.data.status === statusType;
      }
      return true;
    },
    [statusType]
  );

  const updateProducts = useCallback(
    (idsToUpdatedProducts: Map<number, Product>) => {
      try {
        setProducts(
          products.map((product: Product) =>
            idsToUpdatedProducts.has(product.id) ? idsToUpdatedProducts.get(product.id)! : product
          )
        );
      } catch (error) {
        console.log("error on updateProducts callback: ", error);
      }
    },
    [products]
  );
  const updateProductsRef = useRef(updateProducts);
  useEffect(() => {
    updateProductsRef.current = updateProducts;
  }, [updateProducts]);

  const pollForUpdates = useCallback(() => {
    if (pollingForVersionIds.current.size === 0) return;
    console.log("Polling...", pollingForVersionIds.current);
    fetcher.submit(
      {
        actionType: "pollForVersionUpdates",
        versionIDs: JSON.stringify(Array.from(pollingForVersionIds.current)),
      },
      { method: "POST" }
    );
  }, [fetcher, pollingForVersionIds]);

  useEffect(() => {
    if (!fetcher.data?.updatedProducts) return;

    const idToUpdatedProduct = new Map<number, Product>();
    const generatedVersionIds = new Set<number>();
    fetcher.data.updatedProducts.forEach((product: Product) => {
      idToUpdatedProduct.set(product.id, product);
      product.versions.forEach((version) => {
        if (version.status === VersionStatus.Generating) {
          generatedVersionIds.add(version.id);
        }
      });
    });

    updateProductsRef.current(idToUpdatedProduct);
    pollingForVersionIds.current = new Set([...pollingForVersionIds.current, ...generatedVersionIds]);
  }, [fetcher.data?.updatedProducts]);

  useEffect(() => {
    if (!fetcher.data?.updatedVersions) return;

    const updatedProducts = productsRef.current.map((product) => ({
      ...product,
      versions: product.versions.map(
        (version) =>
          fetcher.data.updatedVersions.find((updatedVersion: Version) => updatedVersion.id === version.id) || version
      ),
    }));

    setProducts(updatedProducts);
  }, [fetcher.data?.updatedVersions, setProducts]);

  useEffect(() => {
    const intervalId = setInterval(() => pollForUpdates(), 3000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [pollForUpdates]); // Empty dependency array ensures this effect runs only once

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: Product[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, []);

  const onProductClick = (product: Product) => {
    toggleMainDrawer(<ProductView product={product} toggleSecondaryDrawer={toggleSecondaryDrawer} />);
  };

  const onActionButtonClicked = useCallback(
    async (productStatusAction: ProductAction) => {
      console.log("selectedRows: ", selectedRows);
      await fetcher.submit(
        { actionType: "performProductAction", products: JSON.stringify(selectedRows), productStatusAction },
        { method: "POST" }
      );
      if (productStatusAction === ProductAction.Activate) {
        toast.success("Activated Products!", {
          // style: {
          //   display: "inline-block", // Use inline-block for shrink-to-fit behavior
          //   minWidth: "auto",
          //   margin: "0 auto", // Center the toast
          // },
        });
      } else if (productStatusAction === ProductAction.Deactivate) {
        toast.success("Deactivated Products!", {
          // style: { minWidth: "auto", maxWidth: "none" },
        });
      }
    },
    [selectedRows, fetcher]
  );

  const hasActiveRows = selectedRows.some((row) => row.status === ProductStatus.Active);
  const hasInactiveRows = selectedRows.some((row) => row.status === ProductStatus.Inactive);

  return (
    <div className="flex flex-col ag-theme-quartz container mx-auto p-4 h-screen">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Centralized Product Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Search products..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onInput={onFilterTextBoxChanged}
        />
      </div>

      {/* Tabbed Filter Interface and Conditional Buttons */}
      <div className="flex justify-between items-end mb-4 border-b flex-wrap">
        <div className="flex">
          {["All Products", "Active", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() => externalFilterChanged(status)}
              className={`px-4 py-2 h-11 text-sm font-semibold hover:bg-gray-100 ${
                statusType === status ? "border-b-2 border-primary text-primary" : "text-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-shrink-0">
          {hasInactiveRows && (
            <ActionButton
              text="Activate Selected Products"
              onClick={() => onActionButtonClicked(ProductAction.Activate)}
            />
          )}
          {hasActiveRows && (
            <ActionButton
              text="Deactivate Selected Products"
              onClick={() => onActionButtonClicked(ProductAction.Deactivate)}
              noMarginRight
            />
          )}
        </div>
        {/* <div className="mt-1"></div> */}
      </div>

      <div className="flex-grow">
        <AgGridReact
          defaultColDef={defaultColDef}
          ref={gridRef}
          columnDefs={colDefs}
          rowData={products}
          pagination={true}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
          onSelectionChanged={onSelectionChanged}
          rowSelection={"multiple"}
          onRowClicked={(e) => onProductClick(e.data)}
          suppressRowClickSelection={true}
        />

        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
}
