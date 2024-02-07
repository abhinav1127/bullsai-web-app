import type { FC } from "react";
import { useCallback } from "react";
import { VersionAction } from "~/types/enums";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import type { VersionWithOriginalTitle } from "~/types/types";
import { ActionButton } from "./ActionButton";

const PendingVersionActionButtons: FC<{
  selectedRows: VersionWithOriginalTitle[];
  fetcherSubmit: fetcherSubmitType;
}> = ({ selectedRows, fetcherSubmit }) => {
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
    <div className="flex flex-shrink-0 mb-6 border-b flex-wrap justify-end">
      <ActionButton
        text="Approve Selected Versions"
        onClick={() => onActionButtonClicked(VersionAction.Approve)}
        disabled={selectedRows.length === 0}
      />
      <ActionButton
        text="Reject Selected Products"
        onClick={() => onActionButtonClicked(VersionAction.Reject)}
        noMarginRight
        disabled={selectedRows.length === 0}
      />
    </div>
  );
};

export default PendingVersionActionButtons;
