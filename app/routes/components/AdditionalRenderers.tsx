import { ChevronRightIcon } from "@heroicons/react/24/solid";

export const ClickableIndicatorCellRenderer = () => {
  return (
    <div className="flex items-center justify-center h-full cursor-pointer hover:text-primary">
      <ChevronRightIcon className="w-6 h-6" />
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

export const TruncatedTextRenderer = ({ value }: { value: string }) => {
  const truncatedText = value && value.length > 200 ? `${value.substring(0, 200)}...` : value;
  return <div className="leading-normal">{truncatedText}</div>;
};
