import { AgGridReact } from "ag-grid-react";
import { ClickableIndicatorCellRenderer, TruncatedRenderer2Line } from "./AdditionalRenderers";
import { ProductStatusRenderer } from "./StatusRenderers";
import { VersionsRenderer } from "./VersionsRenderer";
import { percentageValueFormatter } from "../constants/utils";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "~/types/types";
import ProductView from "./ProductView";
import type { ProductStatusFilter } from "~/types/enums";
import type { FetcherWithComponents } from "@remix-run/react";
import type { OutletContextType } from "~/types/outletContextTypes";

const defaultColDef = {
  flex: 1,
  minWidth: 80,
  filter: true,
  cellStyle: { cursor: "pointer" },
  wrapHeaderText: true,
};

const colDefs = [
  {
    headerName: "Title",
    field: "title",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    minWidth: 250,
    cellRenderer: TruncatedRenderer2Line,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
  },
  { headerName: "Status", field: "status", cellRenderer: ProductStatusRenderer, minWidth: 100, width: 110 },
  { headerName: "Versions", field: "versions", cellRenderer: VersionsRenderer },
  { headerName: "Views", field: "statistics.views" },
  {
    headerName: "Personalized %",
    field: "statistics.personalizedPercentage",
    valueFormatter: percentageValueFormatter,
  },
  { headerName: "CVR Lift", field: "statistics.conversionRateLift", valueFormatter: percentageValueFormatter },
  { headerName: "ATC Lift", field: "statistics.addToCartRateLift", valueFormatter: percentageValueFormatter },
  {
    headerName: "Revenue Added",
    field: "statistics.marginalRevenue",
    valueFormatter: (params) => {
      if (!params.value) {
        return "-";
      }
      return "$" + String(params.value).toLocaleString();
    },
  },

  {
    headerName: "",
    cellRenderer: ClickableIndicatorCellRenderer,
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    suppressSizeToFit: true,
    suppressMovable: true,
    filter: true,
  },
];

interface ProductsTableProps {
  statusType: ProductStatusFilter;
  gridRef: React.MutableRefObject<AgGridReact | null>;
  setSelectedRows: (selectedRows: Product[]) => void;
  products: Product[];
  outletContext: OutletContextType;
}

const ProductsTable: FC<ProductsTableProps> = ({ statusType, gridRef, setSelectedRows, products, outletContext }) => {
  const { openMainDrawer, setDrawerProduct } = outletContext;

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

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: Product[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, [gridRef, setSelectedRows]);

  const onProductClick = (product: Product) => {
    setDrawerProduct(product);
    openMainDrawer();
  };

  return (
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
  );
};

export default ProductsTable;
