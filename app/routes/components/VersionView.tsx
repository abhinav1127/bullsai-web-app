import type { FC } from "react";
import type { Product, Version } from "../types/types";
import { VersionStatusRenderer } from "./StatusRenderers";

const VersionView: FC<{ defaultVersion: Version; version: Version }> = ({ defaultVersion, version }) => {
  return (
    <div className="flex-col mx-auto p-4 h-5/6">
      <div className="flex items-center">
        <div className="text-3xl font-bold mr-5 flex-grow whitespace-nowrap">{version.versionTitle}</div>
        <VersionStatusRenderer value={version.status} data={version} noMargin large />
      </div>
    </div>
  );
};

export default VersionView;
