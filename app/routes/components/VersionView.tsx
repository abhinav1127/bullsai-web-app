import type { FC } from "react";
import type { Version } from "../../types/types";
import { VersionStatusRenderer } from "./StatusRenderers";
import { VersionMetricsSummaryCard } from "./MetricsSummaryCards";
import { ActionButton } from "./Buttons";
import { VersionAction, VersionStatus } from "../../types/enums";
import React from "react";
import { InformationCardBadge } from "./Badges";
import type { fetcherSubmitType } from "~/types/outletContextTypes";
import useVersionActionHook from "../customHooks/useVersionActionHook";
import useEditVersion from "../customHooks/useEditVersion";
import { VersionComparisonSection } from "./VersionComparisonSection";

export const DrawerTitleSection: FC<{
  title: string;
  statusRenderer: JSX.Element;
  rightSideComponent: JSX.Element;
}> = ({ title, statusRenderer, rightSideComponent }) => {
  return (
    <div className="flex justify-between my-1 gap-4">
      <div className="flex flex-col gap-5">
        <div className="flex justify-start">{statusRenderer}</div>
        <div className="text-2xl font-bold mr-5 text-wrap">{title}</div>
      </div>

      {rightSideComponent}
    </div>
  );
};

const TargetCustomerAttributesCard: FC<{ attributes: string[] }> = ({ attributes }) => {
  return (
    <div className="flex flex-col">
      <InformationCardBadge header="Target Customer Attributes" />
      <div className="flex flex-wrap justify-center border rounded-lg px-4 pb-1 pt-2 flex-grow-1">
        {attributes.map((attribute, index) => (
          <span
            key={index}
            className="inline-block border border-gray-300 text-gray-800 bg-gray-100 text-xs font-semibold mx-1 my-1 px-2.5 py-0.5 rounded-full"
          >
            {attribute}
          </span>
        ))}
      </div>
    </div>
  );
};

interface VersionActionButtonsProps {
  version: Version;
  fetcherSubmit: fetcherSubmitType;
  status: VersionStatus;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
  onCancelSave: () => void;
}

const VersionActionButtons: FC<VersionActionButtonsProps> = ({
  version,
  fetcherSubmit,
  status,
  isEditing,
  onEditClick,
  onSaveClick,
  onCancelSave,
}) => {
  const onActionButtonClicked = useVersionActionHook(fetcherSubmit, [version]);

  return (
    <div className="flex justify-end flex-shrink-0 relative">
      {status === VersionStatus.Running && (
        <ActionButton text="Pause Version" onClick={() => onActionButtonClicked(VersionAction.Pause)} />
      )}
      {status === VersionStatus.Pending && (
        <React.Fragment>
          <ActionButton text="Approve Version" onClick={() => onActionButtonClicked(VersionAction.Approve)} />
          <ActionButton text="Reject Version" onClick={() => onActionButtonClicked(VersionAction.Reject)} />
        </React.Fragment>
      )}
      {isEditing ? (
        <React.Fragment>
          <ActionButton text="Save Changes" onClick={onSaveClick} />
          <ActionButton text="Cancel" onClick={onCancelSave} />
        </React.Fragment>
      ) : (
        <ActionButton text="Edit Version" onClick={onEditClick} />
      )}
      <ActionButton text="View in Store" onClick={() => {}} noMarginRight />
    </div>
  );
};

const VersionView: FC<{
  defaultVersion: Version | null | undefined;
  version: Version | null;
  fetcherSubmit: fetcherSubmitType;
}> = ({ defaultVersion, version, fetcherSubmit }) => {
  const { isEditing, editedTitle, editedDescription, editedImage, handleEditClick, handleSaveClick, onCancelSave } =
    useEditVersion(version, fetcherSubmit);

  if (!version || !defaultVersion) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto p-4 h-5/6 md:h-[calc(100vh-50px)]">
      <DrawerTitleSection
        title={version.versionTitle}
        statusRenderer={<VersionStatusRenderer value={version.status} data={version} noMargin />}
        rightSideComponent={<VersionMetricsSummaryCard statistics={version.statistics} />}
      />

      <div className="flex justify-between my-1 gap-3 items-end	">
        <TargetCustomerAttributesCard attributes={version.attributes} />
        <div className="flex justify-end flex-shrink-0 relative">
          <VersionActionButtons
            version={version}
            fetcherSubmit={fetcherSubmit}
            status={version.status}
            isEditing={isEditing}
            onEditClick={handleEditClick}
            onSaveClick={handleSaveClick}
            onCancelSave={onCancelSave}
          />
        </div>
      </div>

      <div className="flex mt-4 md:max-h-[calc(100vh-200px)] w-full overflow-scroll gap-2">
        <VersionComparisonSection
          version={defaultVersion}
          badgeLabel="Default Version"
          backgroundColor="bg-blue-500"
          fetcherSubmit={fetcherSubmit}
        />
        <VersionComparisonSection
          version={version}
          badgeLabel="Personalized Version"
          backgroundColor="bg-green-700"
          isEditing={isEditing}
          fetcherSubmit={fetcherSubmit}
        />
      </div>
    </div>
  );
};

export default VersionView;
