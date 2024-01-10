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
import { defaultVersionDisplayString } from "~/constants";

interface ProductMetricsTableProps {
  product: Product;
  viewMode: ProductViewMode;
  defaultVersion: Version;
  selectedRows: Version[];
  setSelectedRows: (selectedRows: Version[]) => void;
  onVersionClick: (version: Version) => void;
}

const ProductViewTable: FC<ProductMetricsTableProps> = ({
  product,
  viewMode,
  defaultVersion,
  selectedRows,
  setSelectedRows,
  onVersionClick,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const rowData = useMemo(() => {
    return product.versions.filter(
      (version) => version.id !== defaultVersion.id && version.status !== VersionStatus.Rejected
    );
  }, [defaultVersion, product]);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: Version[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, [setSelectedRows]);

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
        rowHeight={90}
        onRowClicked={(e) => onVersionClick(e.data)}
        pinnedTopRowData={[{ ...defaultVersion, versionTitle: defaultVersionDisplayString }]}
      />
    </div>
  );
};

export default ProductViewTable;
