import { ChevronRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { defaultVersionDisplayString } from "~/constants";
import type { Version } from "../types/types";

export const ClickableIndicatorCellRenderer: React.FC<{ data: Version }> = ({ data }) => {
  return (
    <div className="flex items-center justify-center h-full cursor-pointer hover:text-primary">
      {data.versionTitle === defaultVersionDisplayString ? (
        <ArrowTopRightOnSquareIcon className="w-6 h-6" />
      ) : (
        <ChevronRightIcon className="w-6 h-6" />
      )}
    </div>
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
