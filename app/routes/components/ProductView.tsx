import type { FC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { DefaultVersionDetailsCard, ProductMetricsSummaryCard } from "./MetricsSummaryCards";
import { ProductViewMode, VersionStatus } from "../types/enums";
import ProductViewTable from "./ProductViewTable";
import type { Product, Version } from "../types/types";
import { ProductStatusRenderer } from "./StatusRenderers";
import { Tooltip } from "react-tooltip";

interface ProductViewProps {
  product: Product;
}

const ProductView: FC<ProductViewProps> = ({ product }) => {
  console.log("ProductView", product);
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

  return (
    <div className="flex flex-col mx-auto p-4 h-5/6">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-3xl font-bold mr-3	text-center">{product.title}</div>
          <ProductStatusRenderer value={product.status} data={product} />
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
                <button
                  className="px-4 py-2 mr-2 mb-1 text-sm font-semibold bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
                  onClick={() => {}}
                >
                  Approve Selected Versions
                </button>
                <button
                  className="px-4 py-2 mr-2 mb-1 text-sm font-semibold bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
                  onClick={() => {}}
                >
                  Reject Selected Versions
                </button>
              </div>
            )}
            {hasRunningVersionsSelected && (
              <button
                className="px-4 py-2 mb-1 text-sm font-semibold bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
                onClick={() => {
                  /* logic to deactivate products */
                }}
              >
                Pause Selected Versions
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <DefaultVersionDetailsCard version={defaultVersion} productViewMode={productViewMode} />
        <ProductViewTable
          viewMode={productViewMode}
          product={product}
          defaultVersion={defaultVersion}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>

      <Tooltip id="product-view-tooltip" />
    </div>
  );
};

export default ProductView;
