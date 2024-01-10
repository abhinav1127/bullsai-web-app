import type { FC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { ProductMetricsSummaryCard } from "./MetricsSummaryCards";
import { ProductViewMode, VersionStatus } from "../types/enums";
import ProductViewTable from "./ProductViewTable";
import type { Product, Version } from "../types/types";
import { ProductStatusRenderer } from "./StatusRenderers";
import { Tooltip } from "react-tooltip";
import VersionView from "./VersionView";
import { ActionButton } from "./Buttons";

const ProductView: FC<{
  product: Product;
  toggleSecondaryDrawer: (component: React.ReactNode) => void;
}> = ({ product, toggleSecondaryDrawer }) => {
  const [productViewMode, setProductViewMode] = useState<ProductViewMode>(ProductViewMode.Metrics);
  const [selectedRows, setSelectedRows] = useState<Version[]>([]);

  const viewModeChanged = useCallback((newValue: ProductViewMode) => {
    setProductViewMode(newValue);
  }, []);

  const defaultVersion = useMemo(() => {
    const defaultVersion = product.versions.find((version) => version.id === product.defaultVersionId);
    if (!defaultVersion) {
      throw new Error("Default version not found");
    }
    return defaultVersion;
  }, [product]);

  const { hasPendingVersionsSelected, hasRunningVersionsSelected } = useMemo(() => {
    return {
      hasPendingVersionsSelected: selectedRows.some((version) => version.status === VersionStatus.Pending),
      hasRunningVersionsSelected: selectedRows.some((version) => version.status === VersionStatus.Running),
    };
  }, [selectedRows]);

  const onVersionClick = useCallback(
    (version: Version) => {
      // TODO: Redirect to default page
      if (version.id === defaultVersion.id) {
        return;
      }

      toggleSecondaryDrawer(<VersionView version={version} defaultVersion={defaultVersion} />);
    },
    [defaultVersion, toggleSecondaryDrawer]
  );

  return (
    <div className="flex flex-col mx-auto p-4 h-5/6 md:h-[calc(100vh-50px)]">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex items-center">
          <div className="text-3xl font-bold mr-5	text-center whitespace-nowrap">{product.title}</div>
          <ProductStatusRenderer value={product.status} data={product} large />
        </div>

        <ProductMetricsSummaryCard statistics={product.statistics} />
      </div>

      {/* Tabbed Filter Interface and Conditional Buttons */}
      <div className="flex justify-between items-center mb-4 border-b">
        <div className="flex">
          {Object.values(ProductViewMode).map((viewMode) => (
            <button
              key={viewMode}
              onClick={() => viewModeChanged(viewMode)}
              className={`px-4 py-2 mt-1 text-sm font-semibold hover:bg-gray-100 ${
                productViewMode === viewMode ? "border-b-2 border-primary text-primary" : "text-gray-600"
              }`}
            >
              {viewMode}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex">
            {hasPendingVersionsSelected && (
              <div>
                <ActionButton text="Approve Selected Versions" onClick={() => {}} />
                <ActionButton text="Reject Selected Versions" onClick={() => {}} />
              </div>
            )}
            {hasRunningVersionsSelected && (
              <ActionButton text="Pause Selected Versions" onClick={() => {}} noMarginRight />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <ProductViewTable
          viewMode={productViewMode}
          product={product}
          defaultVersion={defaultVersion}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onVersionClick={onVersionClick}
        />
      </div>

      <Tooltip id="product-view-tooltip" />
    </div>
  );
};

export default ProductView;
