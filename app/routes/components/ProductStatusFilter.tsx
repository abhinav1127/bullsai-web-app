import type { FC } from "react";
import { useCallback } from "react";
import { ProductStatusFilter } from "~/types/enums";

const ProductStatusRadioFilter: FC<{
  statusType: ProductStatusFilter;
  setStatusType: (statusType: ProductStatusFilter) => void;
}> = ({ statusType, setStatusType }) => {
  const externalFilterChanged = useCallback(
    (newValue: ProductStatusFilter) => {
      setStatusType(newValue);
    },
    [setStatusType]
  );

  return (
    <div className="flex">
      {Object.values(ProductStatusFilter).map((status) => (
        <button
          key={status}
          onClick={() => externalFilterChanged(status)}
          className={`px-4 py-2 h-11 text-sm font-semibold hover:bg-gray-100 ${
            statusType === status ? "border-b-2 border-primary text-primary" : "text-gray-600"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default ProductStatusRadioFilter;
