import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ProductStatus, VersionStatus } from "../../types/enums";
import type { FC } from "react";
import React from "react";
import type { Product, Version } from "../../types/types";

interface ProductStatusRendererProps {
  value?: ProductStatus;
  data: Product;
  large?: boolean;
}

export const ProductStatusRenderer: FC<ProductStatusRendererProps> = ({ value, data, large }) => {
  let backgroundColorClass;
  switch (data.status) {
    case ProductStatus.Active:
      backgroundColorClass = "bg-green-700";
      break;
    case ProductStatus.Inactive:
      backgroundColorClass = "bg-red-700";
      break;
    default:
      backgroundColorClass = "bg-gray-500";
  }

  const activeCount = data.versions?.filter((v) => v.status === VersionStatus.Running).length;

  return (
    <div className="flex w-full h-full items-center">
      <span className={`px-2 py-1 ${backgroundColorClass} text-white text-xs rounded-full font-semibold tracking-wide`}>
        {data.status}
      </span>
      {data.status === ProductStatus.Active && !activeCount && (
        <React.Fragment>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content="There are no running versions for this active product"
            data-tooltip-place="top"
            className="relative flex items-center"
          >
            <ExclamationTriangleIcon className="text-orange-500 h-5 w-5 ml-1.5" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

interface VersionStatusRendererProps {
  value?: VersionStatus;
  data: Version;
  noMargin?: boolean;
}

export const VersionStatusRendererForTable: FC<VersionStatusRendererProps> = ({ value, data }) => {
  return (
    <div className="flex w-full h-full items-start">
      <VersionStatusRenderer value={value} data={data} />
    </div>
  );
};

export const VersionStatusRenderer: FC<VersionStatusRendererProps> = ({ value, data, noMargin }) => {
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
    case VersionStatus.Generating:
      backgroundColorClass = "bg-gray-600";
      break;
    case VersionStatus.Default:
      backgroundColorClass = "bg-blue-500";
      break;
    default:
      backgroundColorClass = "bg-gray-500";
  }

  return (
    <span
      className={`${
        !noMargin && "mt-2"
      } px-2 py-1 ${backgroundColorClass} text-white text-xs rounded-full font-semibold tracking-wide`}
    >
      {data.status}
    </span>
  );
};

export const DefaultVersionRenderer = () => {
  return (
    <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide">
      Default Version
    </span>
  );
};
