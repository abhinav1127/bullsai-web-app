import {
  ArrayRenderer,
  ClickableIndicatorCellRenderer,
  ImageRenderer,
  TruncatedRenderer,
  TruncatedRenderer2Line,
} from "../components/AdditionalRenderers";
import {
  ProductStatusRenderer,
  VersionStatusRenderer,
  VersionStatusRendererForTable,
} from "../components/StatusRenderers";
import { VersionsRenderer } from "../components/VersionsRenderer";
import { toFixedIfNecessary } from "./utils";

export const percentageValueFormatter = (params) => {
  if (!params.value) {
    return "-";
  }
  return toFixedIfNecessary(params.value) + "%";
};

export const colDefs = [
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

export const defaultColDef = {
  flex: 1,
  minWidth: 80,
  filter: true,
  cellStyle: { cursor: "pointer" },
  wrapHeaderText: true,
};

export const productViewDefaultColDef = {
  flex: 1,
  // minWidth: 100,
  filter: true,
  // autoHeight: true,
  cellStyle: { cursor: "pointer" },
  wrapHeaderText: true,
};

export const metricsColDefs = [
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
  { headerName: "Status", field: "status", cellRenderer: VersionStatusRendererForTable, minWidth: 90, width: 120 },
  { headerName: "Views", field: "statistics.views" },
  { headerName: "Display %", field: "statistics.displayPercentage", valueFormatter: percentageValueFormatter },
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

export const versionDetailsColDefs = [
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
  { headerName: "Status", field: "status", cellRenderer: VersionStatusRenderer, minWidth: 90, width: 120 },
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
    cellRenderer: TruncatedRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
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
