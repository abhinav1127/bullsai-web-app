import { VersionAction, VersionStatus } from "~/types/enums";
import { ActionButton } from "./Buttons";
import type { Version } from "~/types/types";
import type { FC } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import type { fetcherSubmitType } from "~/types/outletContextTypes";

const ProductViewActionButtons: FC<{ selectedRows: Version[]; fetcherSubmit: fetcherSubmitType }> = ({
  selectedRows,
  fetcherSubmit,
}) => {
  const onActionButtonClicked = useCallback(
    async (versionAction: VersionAction) => {
      await fetcherSubmit(
        { actionType: "performVersionAction", versions: JSON.stringify(selectedRows), versionAction },
        { method: "POST" }
      );
    },
    [selectedRows, fetcherSubmit]
  );
  return (
    <div className="flex flex-shrink-0">
      {selectedRows.some((version) => version.status === VersionStatus.Pending) && (
        <div>
          <ActionButton text="Approve Selected Versions" onClick={() => onActionButtonClicked(VersionAction.Approve)} />
          <ActionButton text="Reject Selected Versions" onClick={() => onActionButtonClicked(VersionAction.Reject)} />
        </div>
      )}
      {selectedRows.some((version) => version.status === VersionStatus.Running) && (
        <ActionButton
          text="Pause Selected Versions"
          onClick={() => onActionButtonClicked(VersionAction.Pause)}
          noMarginRight
        />
      )}
    </div>
  );
};

export default ProductViewActionButtons;
