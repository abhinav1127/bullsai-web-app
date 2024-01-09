import { useState, type FC, useCallback, useMemo, useRef } from "react";
import type { Product, Version } from "../types/types";
import { ProductViewMode, VersionStatus } from "../types/enums";
import { AgGridReact } from "ag-grid-react";
import {
  defaultColDef,
  metricsColDefs,
  productViewDefaultColDef,
  versionDetailsColDefs,
} from "../constants/tableConstants";
import { percentChange } from "../constants/utils";

interface ProductMetricsTableProps {
  product: Product;
  viewMode: ProductViewMode;
  defaultVersion: Version;
  selectedRows: Version[];
  setSelectedRows: (selectedRows: Version[]) => void;
}

const ProductViewTable: FC<ProductMetricsTableProps> = ({
  product,
  viewMode,
  defaultVersion,
  selectedRows,
  setSelectedRows,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const rowData = useMemo(() => {
    return product.versions
      .filter((version) => version.id !== product.defaultVersionId && version.status !== VersionStatus.Rejected)
      .map((version) => ({
        ...version,
        statistics: {
          conversionRateLift: percentChange(
            defaultVersion.statistics.conversionRate,
            version.statistics.conversionRate
          ),
          addToCartRateLift: percentChange(defaultVersion.statistics.addToCartRate, version.statistics.addToCartRate),
          ...version.statistics,
        },
      }));
  }, [product, defaultVersion]);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: Version[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, []);

  return (
    <div className="ag-theme-quartz container flex-grow">
      <AgGridReact
        defaultColDef={productViewDefaultColDef}
        ref={gridRef}
        columnDefs={viewMode === ProductViewMode.Metrics ? metricsColDefs : versionDetailsColDefs}
        rowData={rowData}
        onSelectionChanged={onSelectionChanged}
        rowSelection={"multiple"}
        // onRowClicked={(e) => onProductClick(e.data)}
        suppressRowClickSelection={true}
        // rowHeight={100}
      />
    </div>
  );
};

export default ProductViewTable;
