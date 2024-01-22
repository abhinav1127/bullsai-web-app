import { ChevronRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { defaultVersionDisplayString } from "~/constants";
import type { Version } from "../../types/types";
import { LoadingSpinner } from "./Svgs";

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

export const ArrayRenderer = ({ value }: { value: string[] }) => {
  return <div className={`leading-normal break-words`}>{value.join(", ")}</div>;
};
