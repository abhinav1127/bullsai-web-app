import type { FC } from "react";
import type { Product, Version } from "../types/types";
import { VersionStatusRenderer } from "./StatusRenderers";
import { VersionMetricsSummaryCard } from "./MetricsSummaryCards";
import { ActionButton } from "./Buttons";
import { VersionStatus } from "../types/enums";
import React from "react";

const VersionComparisonSection: FC<{ version: Version; badgeLabel: string }> = ({ version, badgeLabel }) => {
  return (
    <div className="flex flex-col flex-1 p-4 border rounded-lg">
      {/* <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start">
        {badgeLabel}
      </span> */}
      <div className="overflow-auto h-full">
        <p className="text-lg font-bold mt-2 text-center">{version.productTitle}</p>
        <img src={version.heroImage} alt={version.productTitle} className="w-32 h-32 object-cover rounded-full mt-2" />
        <p className="text-gray-600 mt-2">{version.description}</p>
      </div>
    </div>
  );
};

const VersionView: FC<{ defaultVersion: Version; version: Version }> = ({ defaultVersion, version }) => {
  return (
    <div className="flex flex-col mx-auto p-4 h-5/6 md:h-[calc(100vh-50px)]">
      <div className="flex justify-between flex-wrap my-2 gap-3">
        <div className="flex items-center">
          <div className="text-3xl font-bold mr-5 whitespace-nowrap">{version.versionTitle}</div>
          <VersionStatusRenderer value={version.status} data={version} noMargin />
        </div>

        <div className="flex self-center">
          <VersionMetricsSummaryCard statistics={version.statistics} />
        </div>
      </div>

      <div className="flex justify-between flex-wrap my-2 gap-3">
        <div className="flex items-center flex-col bg-white shadow-md rounded-lg px-4 py-1 w-full md:w-auto">
          <p className="text-sm font-semibold text-gray-700 text-center">Target Customer Attributes</p>
          <div className="flex flex-wrap justify-center mt-2">
            {version.attributes.map((attribute, index) => (
              <span
                key={index}
                className="inline-block border border-gray-300 text-gray-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full"
              >
                {attribute}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-end flex-shrink-0">
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

      <div className="flex flex-col md:flex-row -mb-7 z-10">
        <div className="flex-1">
          <span className="px-3 py-1 ml-3 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start">
            Default
          </span>
        </div>
        <div className="flex-1">
          <span className="px-3 py-1 ml-3 bg-blue-500 text-white text-xs rounded-full uppercase font-semibold tracking-wide self-start">
            Personalized
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4 md:h-[calc(100vh-200px)] overflow-scroll">
        <VersionComparisonSection version={defaultVersion} badgeLabel="Default" />
        <VersionComparisonSection version={version} badgeLabel="Personalized" />
      </div>
    </div>
  );
};

export default VersionView;
