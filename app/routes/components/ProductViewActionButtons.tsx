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
        { actionType: "performVersionAction", products: JSON.stringify(selectedRows), versionAction },
        { method: "POST" }
      );
      if (version === VersionAction.Approve) {
        toast.success("Approved Versions");
      } else if (versionAction === VersionAction.Pause) {
        toast.success("Paused Versions");
      } else if (versionAction === VersionAction.Reject) {
        toast.success("Rejected Versions");
      }
      console.error("Version Action not implemented", versionAction);
    },
    [selectedRows, fetcher]
  );
  return (
    <div className="flex flex-shrink-0">
      {selectedRows.some((version) => version.status === VersionStatus.Pending) && (
        <div>
          <ActionButton text="Approve Selected Versions" onClick={() => {}} />
          <ActionButton text="Reject Selected Versions" onClick={() => {}} />
        </div>
      )}
      {selectedRows.some((version) => version.status === VersionStatus.Running) && (
        <ActionButton text="Pause Selected Versions" onClick={() => {}} noMarginRight />
      )}
    </div>
  );
};

export default ProductViewActionButtons;
