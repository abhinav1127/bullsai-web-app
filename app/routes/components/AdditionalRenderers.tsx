import { ChevronRightIcon, ArrowTopRightOnSquareIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { defaultVersionDisplayString } from "~/constants";
import type { Version } from "../../types/types";
import { LoadingSpinner } from "../constants/Svgs";
import DOMPurify from "dompurify";

export const ClickableIndicatorCellRenderer: React.FC<{ data: Version }> = ({ data }) => {
  let iconIndicator = <ChevronRightIcon className="w-6 h-6" />;
  if (data.versionTitle === defaultVersionDisplayString) {
    iconIndicator = <ArrowTopRightOnSquareIcon className="w-6 h-6" />;
  } else if (data.status === "Generating") {
    iconIndicator = <LoadingSpinner additionalClasses="h-8 w-8 -mx-0.5 -my-0.5" />;
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

export const VersionActionRenderer = () => {
  return (
    <div className="flex items-center justify-center h-full  p-1">
      <div className="bg-white border-green-700 border p-1 rounded-sm m-1 hover:bg-green-100">
        <CheckIcon className="h-5 w-5 text-green-700" />
      </div>
      <div className="bg-white border-red-700 border p-1 rounded-sm m-1 hover:bg-red-100">
        <XMarkIcon className="h-5 w-5 text-red-700" />
      </div>
    </div>
  );
};
