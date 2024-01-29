import { ProductAction, ProductStatus } from "~/types/enums";
import { ActionButton } from "./Buttons";
import type { FC } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import type { Product } from "~/types/types";
import type { fetcherSubmitType } from "~/types/outletContextTypes";

const ProductActionButtons: FC<{ selectedRows: Product[]; fetcherSubmit: fetcherSubmitType }> = ({
  selectedRows,
  fetcherSubmit,
}) => {
  const onActionButtonClicked = useCallback(
    async (productStatusAction: ProductAction) => {
      await fetcherSubmit(
        { actionType: "performProductAction", products: JSON.stringify(selectedRows), productStatusAction },
        { method: "POST" }
      );
      if (productStatusAction === ProductAction.Activate) {
        toast.success("Activated Products!", {
          // style: {
          //   display: "inline-block", // Use inline-block for shrink-to-fit behavior
          //   minWidth: "auto",
          //   margin: "0 auto", // Center the toast
          // },
        });
      } else if (productStatusAction === ProductAction.Deactivate) {
        toast.success("Deactivated Products!", {
          // style: { minWidth: "auto", maxWidth: "none" },
        });
      }
    },
    [selectedRows, fetcherSubmit]
  );
  return (
    <div className="flex flex-shrink-0">
      {selectedRows.some((row) => row.status === ProductStatus.Inactive) && (
        <ActionButton text="Activate Selected Products" onClick={() => onActionButtonClicked(ProductAction.Activate)} />
      )}
      {selectedRows.some((row) => row.status === ProductStatus.Active) && (
        <ActionButton
          text="Deactivate Selected Products"
          onClick={() => onActionButtonClicked(ProductAction.Deactivate)}
          noMarginRight
        />
      )}
    </div>
  );
};

export default ProductActionButtons;
