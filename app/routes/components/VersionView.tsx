import type { FC } from "react";
import type { Product, Version } from "../types/types";
import { VersionStatusRenderer } from "./StatusRenderers";
import { VersionMetricsSummaryCard } from "./MetricsSummaryCards";
import { ActionButton } from "./Buttons";
import { VersionStatus } from "../types/enums";
import React from "react";

const VersionComparisonSection: FC<{ version: Version; badgeLabel: string }> = ({ version, badgeLabel }) => {
  return (
    <div className="flex flex-col flex-1">
      <span className="flex-initial ml-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mb-3 z-10">
        {badgeLabel}
      </span>
      <div className="overflow-scroll h-full border rounded-lg p-4 flex-initial">
        <p className="text-lg font-bold mt-2 text-center">{version.productTitle}</p>
        <div className="flex justify-center">
          <img src={version.heroImage} alt={version.productTitle} className="h-32 object-cover mt-2" />
        </div>
        <p className="text-gray-600 mt-2">{version.description}</p>
      </div>
    </div>
  );
};

const TargetCustomerAttributesCard: FC<{ attributes: string[] }> = ({ attributes }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <span className="flex-initial px-3 py-0.5 text-gray-400 bg-white text-xs rounded-full uppercase font-semibold tracking-wide self-start -mb-3 z-10">
          Target Customer Attributes
        </span>
      </div>
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

const VersionView: FC<{ defaultVersion: Version; version: Version }> = ({ defaultVersion, version }) => {
  return (
    <div className="flex flex-col mx-auto p-4 h-5/6 md:h-[calc(100vh-50px)]">
      <div className="flex justify-between flex-wrap my-1 gap-4">
        <div className="flex flex-col gap-5">
          <div className="flex justify-start">
            <VersionStatusRenderer value={version.status} data={version} noMargin />
          </div>
          <div className="text-3xl font-bold mr-5 ">{version.versionTitle}</div>
        </div>

        <div className="flex self-center">
          <VersionMetricsSummaryCard statistics={version.statistics} />
        </div>
      </div>

      <div className="flex justify-between -my-1 gap-3 items-end	">
        <TargetCustomerAttributesCard attributes={version.attributes} />
        <div className="flex justify-end flex-shrink-0 -z-50 relative">
          {version.status === VersionStatus.Running && <ActionButton text="Pause Version" onClick={() => {}} />}
          {version.status === VersionStatus.Pending && (
            <React.Fragment>
              <ActionButton text="Approve Version" onClick={() => {}} />
              <ActionButton text="Reject Version" onClick={() => {}} />
            </React.Fragment>
          )}
          <ActionButton text="Edit Version" onClick={() => {}} />
          <ActionButton text="View in Store" onClick={() => {}} noMarginRight />
        </div>
      </div>

      <div className="flex mt-4 md:max-h-[calc(100vh-200px)] w-full overflow-scroll gap-2">
        <VersionComparisonSection version={defaultVersion} badgeLabel="Default" />
        <VersionComparisonSection version={version} badgeLabel="Personalized" />
      </div>
    </div>
  );
};

export default VersionView;
