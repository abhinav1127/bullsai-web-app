import { VersionAction, VersionStatus } from "~/types/enums";
import { ActionButton } from "./Buttons";
import type { Version } from "~/types/types";
import type { FC } from "react";
import { useCallback, version } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import { toast } from "react-toastify";

const ProductViewActionButtons: FC<{ selectedRows: Version[]; fetcher: FetcherWithComponents<any> }> = ({
  selectedRows,
  fetcher,
}) => {
  const onActionButtonClicked = useCallback(
    async (versionAction: VersionAction) => {
      await fetcher.submit(
        { actionType: "performVersionAction", versions: JSON.stringify(selectedRows), versionAction },
        { method: "POST" }
      );
      if (versionAction === VersionAction.Approve) {
        toast.success("Approved Versions");
      } else if (versionAction === VersionAction.Pause) {
        toast.success("Paused Versions");
      } else if (versionAction === VersionAction.Reject) {
        toast.success("Rejected Versions");
      } else {
        console.error("Version Action not implemented", versionAction);
      }
    },
    [selectedRows, fetcher]
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
