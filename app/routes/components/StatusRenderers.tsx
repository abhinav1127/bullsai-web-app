import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ProductStatus, VersionStatus } from "../types/enums";
import type { FC } from "react";
import React from "react";
import type { Product, Version } from "../types/types";

interface ProductStatusRendererProps {
  value?: ProductStatus;
  data: Product;
}

export const ProductStatusRenderer: FC<ProductStatusRendererProps> = ({ value, data }) => {
  let backgroundColorClass;
  switch (data.status) {
    case ProductStatus.Active:
      backgroundColorClass = "bg-green-700";
      break;
    case ProductStatus.Inactive:
      backgroundColorClass = "bg-red-700";
      break;
    case ProductStatus.Generating:
      backgroundColorClass = "bg-gray-600";
      break;
    default:
      backgroundColorClass = "bg-gray-500";
  }

  const activeCount = data.versions?.filter((v) => v.status === VersionStatus.Running).length;

  return (
    <div className="flex w-full h-full items-center">
      <div
        className={`inline-flex items-center justify-center ${backgroundColorClass} rounded-md px-2 py-2 mr-1 text-white h-5`}
      >
        {data.status}
      </div>
      {data.status === ProductStatus.Active && !activeCount && (
        <React.Fragment>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content="There are no running versions for this active product"
            data-tooltip-place="top"
            className="relative flex items-center"
          >
            <ExclamationTriangleIcon className="text-orange-500 h-5 w-5 ml-0.5" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

interface VersionStatusRendererProps {
  value?: VersionStatus;
  data: Version;
}

export const VersionStatusRenderer: FC<VersionStatusRendererProps> = ({ value, data }) => {
  let backgroundColorClass;
  switch (data.status) {
    case VersionStatus.Running:
      backgroundColorClass = "bg-green-700";
      break;
    case VersionStatus.Rejected:
      backgroundColorClass = "bg-red-700";
      break;
    case VersionStatus.Pending:
      backgroundColorClass = "bg-yellow-600";
      break;
    case VersionStatus.Regenerating:
      backgroundColorClass = "bg-gray-600";
      break;
    default:
      backgroundColorClass = "bg-gray-500";
  }

  return (
    <div className="flex w-full h-full mt-3">
      <div className={`inline-flex items-center ${backgroundColorClass} rounded-md px-2 py-2 mr-1 text-white h-5`}>
        {data.status}
      </div>
    </div>
  );
};

export const DefaultVersionRenderer = () => {
  return (
    <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide">
      Default Version
    </span>
  );
};
