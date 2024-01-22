import { PlayCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Version } from "../../types/types";
import type { FC } from "react";
import { VersionStatus } from "../../types/enums";
import React from "react";
import { LoadingSpinner } from "./Svgs";

interface VersionsRendererProps {
  value: Version[];
}

export const VersionsRenderer: FC<VersionsRendererProps> = ({ value }) => {
  if (!value) {
    return "-";
  }

  const activeCount = value.filter((v) => v.status === VersionStatus.Running).length;
  const pendingCount = value.filter((v) => v.status === VersionStatus.Pending).length;
  const generatingCount = value.filter((v) => v.status === VersionStatus.Generating).length;

  const countsWithIcons = [
    activeCount > 0 && { count: activeCount, icon: <PlayCircleIcon className="text-green-500 h-4 w-4 ml-0.5" /> },
    pendingCount > 0 && {
      count: pendingCount,
      icon: <ExclamationTriangleIcon className="text-orange-500 h-4 w-4 ml-0.5" />,
    },
    generatingCount > 0 && {
      count: generatingCount,
      icon: <LoadingSpinner additionalClasses="h-3.5 w-3.5 ml-0.5" />,
    }, // Replace with appropriate icon for generatingCount
  ].filter(Boolean);
  console.log(countsWithIcons);

  return (
    <div className="flex items-center">
      {countsWithIcons.map((item, index) => (
        <React.Fragment key={index}>
          {item.count} {item.icon}
          {index < countsWithIcons.length - 1 && <>&nbsp;/&nbsp;</>}
        </React.Fragment>
      ))}
    </div>
  );
};
