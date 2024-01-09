import { PlayCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Version } from "../types/types";
import type { FC } from "react";
import { VersionStatus } from "../types/enums";

interface VersionsRendererProps {
  value: Version[];
}

export const VersionsRenderer: FC<VersionsRendererProps> = ({ value }) => {
  if (!value) {
    return "-";
  }

  const activeCount = value.filter((v) => v.status === VersionStatus.Running).length;
  const pendingCount = value.filter((v) => v.status === VersionStatus.Pending).length;

  return (
    <div className="flex items-center">
      {activeCount > 0 && (
        <>
          {activeCount} <PlayCircleIcon className="text-green-500 h-4 w-4 ml-0.5" />
        </>
      )}
      {activeCount > 0 && pendingCount > 0 && <>&nbsp;/&nbsp;</>}
      {pendingCount > 0 && (
        <>
          {pendingCount} <ExclamationTriangleIcon className="text-orange-500 h-4 w-4 ml-0.5" />
        </>
      )}
    </div>
  );
};
