import type { FC } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { ProductMetricsSummaryCard } from "./MetricsSummaryCards";
import { ProductViewMode, VersionStatus } from "../../types/enums";
import ProductViewTable from "./ProductViewTable";
import type { Product, Version } from "../../types/types";
import { ProductStatusRenderer } from "./StatusRenderers";
import VersionView, { DrawerTitleSection } from "./VersionView";
import ProductViewModeFilterTabs from "./ProductViewModeFilterTabs";
import ProductViewActionButtons from "./ProductViewActionButtons";
import type { FetcherWithComponents } from "@remix-run/react";
import DefaultActionFunction from "../actions/DefaultActionFunction";

export const action = DefaultActionFunction;

const ProductView: FC<{
  product: Product | null;
  toggleSecondaryDrawer: (component: React.ReactNode) => void;
  fetcher: FetcherWithComponents<any>;
}> = ({ product, toggleSecondaryDrawer, fetcher }) => {
  const [productViewMode, setProductViewMode] = useState<ProductViewMode>(ProductViewMode.Metrics);
  const [selectedRows, setSelectedRows] = useState<Version[]>([]);

  console.log("product: ", product);

  const defaultVersion = useMemo(() => {
    if (!product) {
      console.log("no product");
      return null;
    }

    const defaultVersion = product?.versions.find((version) => version.id === product.defaultVersionId);
    if (!defaultVersion) {
      throw new Error("Default version not found");
    }
    return defaultVersion;
  }, [product]);

  const onVersionClick = useCallback(
    (version: Version) => {
      if (!defaultVersion) {
        return;
      }

      // TODO: Redirect to default page
      if (version.id === defaultVersion.id || version.status === VersionStatus.Generating) {
        return;
      }

      toggleSecondaryDrawer(<VersionView version={version} defaultVersion={defaultVersion} />);
    },
    [defaultVersion, toggleSecondaryDrawer]
  );

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto p-4 h-5/6 md:h-[calc(100vh-50px)]">
      <DrawerTitleSection
        title={product.title}
        statusRenderer={<ProductStatusRenderer value={product.status} data={product} large />}
        rightSideComponent={<ProductMetricsSummaryCard statistics={product.statistics} />}
      />

      <div className="flex justify-between items-end mb-4 border-b flex-wrap">
        <ProductViewModeFilterTabs productViewMode={productViewMode} setProductViewMode={setProductViewMode} />
        <ProductViewActionButtons selectedRows={selectedRows} fetcher={fetcher} />
      </div>

      <div className="flex flex-col flex-grow">
        <ProductViewTable
          viewMode={productViewMode}
          product={product}
          defaultVersion={defaultVersion!}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onVersionClick={onVersionClick}
        />
      </div>
    </div>
  );
};

export default ProductView;
