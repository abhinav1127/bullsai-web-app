import type { FC } from "react";
import type { Version } from "../../types/types";
import React, { useCallback } from "react";
import { EditorWithMenu, SimpleEditor } from "./editVersion/TipTap";
import { ActionButton } from "./Buttons";
import type { fetcherSubmitType } from "~/types/outletContextTypes";

interface VersionComparisonSectionProps {
  version: Version;
  badgeLabel: string;
  backgroundColor: string;
  fetcherSubmit: fetcherSubmitType;
  isEditing?: boolean;
}

export const VersionComparisonSection: FC<VersionComparisonSectionProps> = ({
  version,
  badgeLabel,
  backgroundColor,
  isEditing,
  fetcherSubmit,
}) => {
  return (
    <div className="flex flex-col flex-1">
      <span
        className={`flex-initial ml-2 px-3 py-1 ${backgroundColor} text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mb-3 z-10`}
      >
        {badgeLabel}
      </span>
      <div className="overflow-scroll h-full border rounded-lg p-4 flex-initial">
        {isEditing ? (
          <EditingVersionDetailsSection version={version} fetcherSubmit={fetcherSubmit} />
        ) : (
          <NormalVersionDetailsSection version={version} />
        )}
      </div>
    </div>
  );
};

const NormalVersionDetailsSection: FC<{ version: Version }> = ({ version }) => {
  return (
    <React.Fragment>
      <p className="text-lg font-medium mt-2 pb-1 text-center border-b">{version.productTitle}</p>
      <div className="flex flex-col justify-center my-6">
        <img
          src={version.heroImage}
          alt={version.productTitle}
          className="min-h-40 h-48 max-w-full rounded-xl object-contain"
        />
      </div>
      <p className="text-gray-600 text-sm">{version.description}</p>
    </React.Fragment>
  );
};

const EditingVersionDetailsSection: FC<{ version: Version; fetcherSubmit: fetcherSubmitType }> = ({
  version,
  fetcherSubmit,
}) => {
  const onChangeImageClicked = useCallback(async () => {
    fetcherSubmit({ actionType: "getVersionImages", productId: version.productId }, { method: "POST" });
  }, [version, fetcherSubmit]);

  return (
    <React.Fragment>
      <SimpleEditor content={version.productTitle} />
      <div className="flex flex-col justify-center my-6 items-center gap-2">
        <img
          src={version.heroImage}
          alt={version.productTitle}
          className="min-h-40 h-48 max-w-full rounded-xl object-contain items-center"
        />
        <ActionButton text="Change Image" onClick={() => onChangeImageClicked()} />
      </div>
      <EditorWithMenu content={version.description} />
    </React.Fragment>
  );
};
