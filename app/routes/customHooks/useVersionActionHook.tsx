import { useCallback } from "react";
import type { VersionAction } from "~/types/enums";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import type { Version } from "~/types/types";

function useVersionActionHook(fetcherSubmit: fetcherSubmitType, versions: Version[]) {
  const onActionButtonClicked = useCallback(
    async (versionAction: VersionAction) => {
      fetcherSubmit(
        { actionType: "performVersionAction", versions: JSON.stringify(versions), versionAction },
        { method: "POST" }
      );
    },
    [versions, fetcherSubmit]
  );

  return onActionButtonClicked;
}

export default useVersionActionHook;
