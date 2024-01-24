import type { FC } from "react";
import { ProductViewMode } from "~/types/enums";

const ProductViewModeFilterTabs: FC<{
  productViewMode: ProductViewMode;
  setProductViewMode: (newValue: ProductViewMode) => void;
}> = ({ productViewMode, setProductViewMode }) => {
  return (
    <div className="flex">
      {Object.values(ProductViewMode).map((viewMode) => (
        <button
          key={viewMode}
          onClick={() => setProductViewMode(viewMode)}
          className={`px-4 py-2 h-11 text-sm font-semibold hover:bg-gray-100 ${
            productViewMode === viewMode ? "border-b-2 border-primary text-primary" : "text-gray-600"
          }`}
        >
          {viewMode}
        </button>
      ))}
    </div>
  );
};

export default ProductViewModeFilterTabs;
