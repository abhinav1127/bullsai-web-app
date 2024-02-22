import { ArrowTopRightOnSquareIcon, CheckIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DOMPurify from "dompurify";
import { useCallback } from "react";
import { VersionAction } from "~/types/enums";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import type { Product, Version, VersionWithOriginalTitle } from "../../types/types";
import { LoadingSpinner } from "../constants/Svgs";
import { defaultVersionDisplayString } from "~/constants";
import { toLowerCaseAndDashes } from "~/utils";

export const ClickableIndicatorCellRenderer: React.FC<{ data: Version }> = ({ data }) => (
  <div className="flex items-center justify-center h-full cursor-pointer hover:text-primary">
    <ChevronRightIcon className="w-6 h-6" />
  </div>
);

export const VersionClickableCellRenderer: React.FC<{ data: Version; product: Product }> = ({ data, product }) => {
  console.log(product);
  let iconIndicator = <LoadingSpinner additionalClasses="h-8 w-8 -mx-0.5 -my-0.5" />;
  if (data.status !== "Generating") {
    // const baseStoreUrl = "https://www.herbivorebotanicals.com/collections/anti-aging/products/";
    // const handle =
    //   data.versionTitle === defaultVersionDisplayString
    //     ? product.handle
    //     : `${product.handle}?utm=${toLowerCaseAndDashes(data.versionTitle)}`;
    iconIndicator = (
      <div className="flex gap-3">
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </a>
        <ChevronRightIcon className="w-5 h-5" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full cursor-pointer hover:text-primary">{iconIndicator}</div>
  );
};

export const ImageRenderer = ({ value }: { value: string }) => {
  return value ? (
    <div>
      <img src={value} alt="Hero" className="h-20 object-cover" />
    </div>
  ) : null;
};

export const TruncatedRenderer2Line = ({ value }: { value: string }) => {
  return <div className="leading-normal line-clamp-2 break-words">{value}</div>;
};

export const TruncatedRenderer = ({ value }: { value: string }) => {
  return <div className="leading-normal line-clamp-4 break-words">{value}</div>;
};

export const TruncatedHTMLRenderer = ({ value }: { value: string }) => {
  const safeHTML = DOMPurify.sanitize(value);
  return <div className="leading-normal line-clamp-4 break-words" dangerouslySetInnerHTML={{ __html: safeHTML }}></div>;
};

export const ArrayRenderer = ({ value }: { value: string[] }) => {
  return <div className={`leading-normal break-words`}>{value.join(", ")}</div>;
};

export const USDateRenderer = ({ value }: { value: string }) => {
  return <div>{new Date(value).toLocaleDateString("en-US")}</div>;
};

export const VersionActionRenderer: React.FC<{ data: VersionWithOriginalTitle; fetcherSubmit: fetcherSubmitType }> = ({
  data,
  fetcherSubmit,
}) => {
  const onActionButtonClicked = useCallback(
    async (versionAction: VersionAction) => {
      await fetcherSubmit(
        { actionType: "performVersionAction", versions: JSON.stringify([data]), versionAction },
        { method: "POST" }
      );
    },
    [data, fetcherSubmit]
  );

  return (
    <div className="flex items-center justify-center h-full  p-1">
      <div
        className="bg-white border-green-700 border p-1 rounded-sm m-1 hover:bg-green-100"
        onClick={() => onActionButtonClicked(VersionAction.Approve)}
      >
        <CheckIcon className="h-5 w-5 text-green-700" />
      </div>
      <div
        className="bg-white border-red-700 border p-1 rounded-sm m-1 hover:bg-red-100"
        onClick={() => onActionButtonClicked(VersionAction.Reject)}
      >
        <XMarkIcon className="h-5 w-5 text-red-700" />
      </div>
    </div>
  );
};
