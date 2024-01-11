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
    <div
    // data-tooltip-id="product-view-tooltip"
    // data-tooltip-content="<img src={value} alt='Hero' className='w-10 h-10 object-cover'/>"
    // data-tooltip-place="top"
    // className="relative flex items-center"
    >
      <img src={value} alt="Hero" className="h-20 object-cover" />
    </div>
  ) : null;
};

export const TruncatedRenderer = ({ value }: { value: string }) => {
  return <div className="leading-normal line-clamp-4 break-words">{value}</div>;
};

export const ArrayRenderer = ({ value }: { value: string[] }) => {
  return <div className={`leading-normal break-words`}>{value.join(", ")}</div>;
};
