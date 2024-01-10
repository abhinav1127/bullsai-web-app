import {
  ArrayRenderer,
  ClickableIndicatorCellRenderer,
  ImageRenderer,
  TitleRenderer,
  TruncatedDescriptionRenderer,
} from "../components/AdditionalRenderers";
import { ProductStatusRenderer, VersionStatusRenderer } from "../components/StatusRenderers";
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
  },
  { headerName: "Status", field: "status", cellRenderer: ProductStatusRenderer },
  { headerName: "Versions", field: "versions", cellRenderer: VersionsRenderer },
  { headerName: "Views", field: "statistics.views" },
  {
    headerName: "Personalized %",
    field: "statistics.personalizedPercentage",
    valueFormatter: percentageValueFormatter,
  },
  { headerName: "Conversion Lift", field: "statistics.conversionRateLift", valueFormatter: percentageValueFormatter },
  { headerName: "Add to Cart %", field: "statistics.addToCartRateLift", valueFormatter: percentageValueFormatter },
  {
    headerName: "Additional Revenue",
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
  minWidth: 120,
  filter: true,
  cellStyle: { cursor: "pointer" },
};

export const productViewDefaultColDef = {
  flex: 1,
  // minWidth: 100,
  filter: true,
  // autoHeight: true,
  cellStyle: { cursor: "pointer" },
};

export const metricsColDefs = [
  {
    headerName: "Version Title",
    field: "versionTitle",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: true,
    cellRenderer: TitleRenderer,
    wrapText: true,
    cellStyle: { wordBreak: "normal" },
    minWidth: 150,
  },
  { headerName: "Status", field: "status", cellRenderer: VersionStatusRenderer },
  { headerName: "Views", field: "statistics.views" },
  { headerName: "Display %", field: "statistics.displayPercentage", valueFormatter: percentageValueFormatter },
  { headerName: "Conversion Lift", field: "statistics.conversionRateLift", valueFormatter: percentageValueFormatter },
  { headerName: "Add to Cart Lift", field: "statistics.addToCartRateLift", valueFormatter: percentageValueFormatter },
  {
    headerName: "Additional Revenue",
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
    cellRenderer: TitleRenderer,
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
    cellRenderer: TitleRenderer,
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
    cellRenderer: TruncatedDescriptionRenderer,
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
