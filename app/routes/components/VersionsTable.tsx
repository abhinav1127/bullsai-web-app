import { type FC, useCallback, useRef } from "react";
import type { Product, Version } from "../../types/types";
import { ProductViewMode, VersionStatus } from "../../types/enums";
import { AgGridReact } from "ag-grid-react";
import {
  VersionClickableCellRendererColDef,
  getRowStyle,
  metricsColDefs,
  productViewDefaultColDef,
  versionDetailsColDefs,
} from "../constants/tableConstants";
import { defaultVersionDisplayString } from "~/constants";

interface VersionMetricsTableProps {
  viewMode: ProductViewMode;
  defaultVersion: Version;
  setSelectedRows: (selectedRows: Version[]) => void;
  onVersionClick: (version: Version) => void;
  rowData: Version[];
  product: Product;
}

const VersionsTable: FC<VersionMetricsTableProps> = ({
  viewMode,
  defaultVersion,
  setSelectedRows,
  onVersionClick,
  rowData,
  product,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: Version[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, [setSelectedRows]);

  const baseColDefs = viewMode === ProductViewMode.Metrics ? metricsColDefs : versionDetailsColDefs;
  const colDefs = [...baseColDefs, VersionClickableCellRendererColDef(product)];
  console.log(colDefs);

  return (
    <div className="ag-theme-quartz container flex-grow">
      <AgGridReact
        defaultColDef={productViewDefaultColDef}
        ref={gridRef}
        columnDefs={colDefs}
        rowData={rowData}
        onSelectionChanged={onSelectionChanged}
        rowSelection={"multiple"}
        suppressRowClickSelection={true}
        rowHeight={90}
        onRowClicked={(e) => onVersionClick(e.data)}
        pinnedTopRowData={[{ ...defaultVersion, versionTitle: defaultVersionDisplayString }]}
        getRowStyle={getRowStyle}
        rowClassRules={{
          "gray-500": (params) => params.data.status === "Generating",
        }}
        isRowSelectable={(params) => params.data.status !== VersionStatus.Generating}
        // below is an attempt to show default pointer for Generating rows. Didn't work because children of row use cursor: pointer
        // getRowClass={(params) => (params.data.status === VersionStatus.Generating ? "!cursor-default" : "")}
      />
    </div>
  );
};

export default VersionsTable;
