import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AgGridStyles from "ag-grid-community/styles/ag-grid.css";
import AgThemeQuartzStyles from "ag-grid-community/styles/ag-theme-quartz.css";
import SampleData from "./components/SampleData";
import { ProductStatus } from "./types/enums";
import { Tooltip } from "react-tooltip";
import { useOutletContext } from "@remix-run/react";
import type { OutletContextType } from "./types/outletContextTypes";
import { colDefs, defaultColDef } from "./constants/tableConstants";
import ProductView from "./components/ProductView";
import type { Product } from "./types/types";

export function links() {
  return [
    { rel: "stylesheet", href: AgGridStyles },
    { rel: "stylesheet", href: AgThemeQuartzStyles },
  ];
}

export default function ProductsPage() {
  const { toggleMainDrawer, toggleSecondaryDrawer } = useOutletContext<OutletContextType>();
  const gridRef = useRef<AgGridReact>(null);
  const [statusType, setStatusType] = useState("All");
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);
  const rowData: Product[] = useMemo(() => {
    return SampleData;
  }, [SampleData]);

  console.log(rowData);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (document.getElementById("filter-text-box") as HTMLInputElement).value;
    gridRef.current?.api.setGridOption("quickFilterText", filterValue);
  }, []);

  const externalFilterChanged = useCallback((newValue: string) => {
    setStatusType(newValue);
  }, []);

  const isExternalFilterPresent = useCallback(() => {
    return statusType !== "All";
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

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: Product[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, []);

  const onProductClick = (product: Product) => {
    toggleMainDrawer(<ProductView product={product} toggleSecondaryDrawer={toggleSecondaryDrawer} />);
  };

  const hasActiveRows = selectedRows.some((row) => row.status === ProductStatus.Active);
  const hasInactiveRows = selectedRows.some((row) => row.status === ProductStatus.Inactive);

  return (
    <div className="flex flex-col ag-theme-quartz container mx-auto p-4" style={{ height: "100vh" }}>
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Centralized Product Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Search products..."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onInput={onFilterTextBoxChanged}
        />
      </div>

      {/* Tabbed Filter Interface and Conditional Buttons */}
      <div className="flex justify-between items-center mb-4 border-b">
        <div className="flex">
          {["All", "Active", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() => externalFilterChanged(status)}
              className={`px-4 py-2 mt-1 text-sm font-semibold hover:bg-gray-100 ${
                statusType === status ? "border-b-2 border-primary text-primary" : "text-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex">
            {hasInactiveRows && (
              <button
                className="px-4 py-2 mr-2 mb-1 text-sm font-semibold bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
                onClick={() => {
                  /* logic to activate products */
                }}
              >
                Activate Selected Products
              </button>
            )}
            {hasActiveRows && (
              <button
                className="px-4 py-2 mb-1 text-sm font-semibold bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
                onClick={() => {
                  /* logic to deactivate products */
                }}
              >
                Deactivate Selected Products
              </button>
            )}
          </div>
          {/* <div className="mt-1"></div> */}
        </div>
      </div>

      <div className="flex-grow">
        <AgGridReact
          defaultColDef={defaultColDef}
          ref={gridRef}
          columnDefs={colDefs}
          rowData={rowData}
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
