import { useOutletContext } from "@remix-run/react";
import AgGridStyles from "ag-grid-community/styles/ag-grid.css";
import AgThemeQuartzStyles from "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { VersionStatus } from "~/types/enums";
import type { OutletContextType } from "~/types/outletContextTypes";
import type { VersionWithOriginalTitle } from "~/types/types";
import {
  ArrayRenderer,
  ClickableIndicatorCellRenderer,
  ImageRenderer,
  TruncatedHTMLRenderer,
  TruncatedRenderer,
  USDateRenderer,
  VersionActionRenderer,
} from "./components/AdditionalRenderers";
import PendingVersionActionButtons from "./components/PendingVersionActionButtons";
import { productViewDefaultColDef } from "./constants/tableConstants";

export function links() {
  return [
    { rel: "stylesheet", href: AgGridStyles },
    { rel: "stylesheet", href: AgThemeQuartzStyles },
  ];
}

export const colDefs = [
  {
    headerName: "Version Title",
    field: "versionTitle",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    cellRenderer: TruncatedRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
    minWidth: 150,
  },
  {
    headerName: "Created At",
    field: "createdAt",
    cellRenderer: USDateRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
    minWidth: 80,
  },
  {
    headerName: "Attributes",
    field: "attributes",
    minWidth: 100,
    cellRenderer: ArrayRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
  },
  {
    headerName: "Product Name",
    field: "productTitle",
    cellRenderer: TruncatedRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
    minWidth: 130,
  },
  { headerName: "Hero Image", field: "heroImage", cellRenderer: ImageRenderer, minWidth: 120 },
  {
    headerName: "Description",
    field: "description",
    minWidth: 300,
    width: 450,
    cellRenderer: TruncatedHTMLRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
  },
  {
    headerName: "",
    cellRenderer: VersionActionRenderer,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    suppressSizeToFit: true,
    suppressMovable: true,
    filter: false,
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

export default function PendingVerisonPage() {
  const outletContext = useOutletContext<OutletContextType>();
  const { fetcherSubmit, products, setDrawerVersionId, openVersionDrawer } = outletContext;
  const gridRef = useRef<AgGridReact>(null);
  const [selectedRows, setSelectedRows] = useState<VersionWithOriginalTitle[]>([]);

  const onVersionClick = (version: VersionWithOriginalTitle) => {
    setDrawerVersionId(version.id);
    openVersionDrawer();
  };

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData: VersionWithOriginalTitle[] = selectedNodes?.map((node) => node.data) || [];
    setSelectedRows(selectedData);
  }, [gridRef, setSelectedRows]);

  const rowData = useMemo(() => {
    let pendingVersions: VersionWithOriginalTitle[] = [];
    products.forEach((product) => {
      const productPendingVersions = product.versions
        .filter((version) => version.status === VersionStatus.Pending)
        .map((version) => ({
          ...version,
          originalProductTitle: product.title,
        }));
      pendingVersions = [...pendingVersions, ...productPendingVersions];
    });
    return pendingVersions;
  }, [products]);

  return (
    <div className="flex flex-col ag-theme-quartz container mx-auto p-4 h-screen">
      <h1 className="text-3xl font-bold mb-8">Pending Versions</h1>

      <PendingVersionActionButtons selectedRows={selectedRows} fetcherSubmit={fetcherSubmit} />

      <div className="flex flex-col flex-grow">
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
            overlayNoRowsTemplate={"No remaining pending versions!"}
          />
        </div>
      </div>
    </div>
  );
}
