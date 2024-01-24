import type { AgGridReact } from "ag-grid-react";
import type { FC, RefObject } from "react";
import { useCallback } from "react";

const ProductSearchBar: FC<{ gridRef: RefObject<AgGridReact<any>> }> = ({ gridRef }) => {
  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (document.getElementById("filter-text-box") as HTMLInputElement).value;
    gridRef.current?.api.setGridOption("quickFilterText", filterValue);
  }, [gridRef]);
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        id="filter-text-box"
        placeholder="Search products..."
        className="w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        onInput={onFilterTextBoxChanged}
      />
    </div>
  );
};

export default ProductSearchBar;
