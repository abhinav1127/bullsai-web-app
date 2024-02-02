import type { FC } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { ProductMetricsSummaryCard } from "./MetricsSummaryCards";
import { ProductViewMode, VersionStatus } from "../../types/enums";
import VersionsTable from "./VersionsTable";
import type { Product, Version } from "../../types/types";
import { ProductStatusRenderer } from "./StatusRenderers";
import { DrawerTitleSection } from "./VersionView";
import ProductViewModeFilterTabs from "./ProductViewModeFilterTabs";
import ProductViewActionButtons from "./ProductViewActionButtons";
import DefaultActionFunction from "../actions/DefaultActionFunction";
import type { fetcherSubmitType } from "~/types/outletContextTypes";

export const action = DefaultActionFunction;

const ProductView: FC<{
  product: Product | null;
  openVersionDrawer: () => void;
  setDrawerVersionId: (versionId: number) => void;
  fetcherSubmit: fetcherSubmitType;
}> = memo(({ product, openVersionDrawer, fetcherSubmit, setDrawerVersionId }) => {
  const [productViewMode, setProductViewMode] = useState<ProductViewMode>(ProductViewMode.Metrics);
  const [selectedRows, setSelectedRows] = useState<Version[]>([]);

  const defaultVersion = useMemo(() => {
    if (!product) {
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

      setDrawerVersionId(version.id);
      openVersionDrawer();
    },
    [defaultVersion, openVersionDrawer, setDrawerVersionId]
  );

  const rowData = useMemo(() => {
    if (!product || !defaultVersion) {
      return [];
    }
    return product.versions.filter(
      (version) => version.id !== defaultVersion.id && version.status !== VersionStatus.Rejected
    );
  }, [defaultVersion, product]);

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
        <ProductViewActionButtons selectedRows={selectedRows} fetcherSubmit={fetcherSubmit} />
      </div>

      <div className="flex flex-col flex-grow">
        <VersionsTable
          viewMode={productViewMode}
          defaultVersion={defaultVersion!}
          setSelectedRows={setSelectedRows}
          onVersionClick={onVersionClick}
          rowData={rowData}
        />
      </div>
    </div>
  );
});

export default ProductView;
