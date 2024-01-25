import { DemoGeneratedVersions } from "./SampleData";
import { VersionAction, VersionStatus } from "./types/enums";
import type { Version } from "./types/types";

export const pollForVersionUpdates = async (versionIds: number[]): Promise<Version[]> => {
  return new Promise((resolve) => {
    // Simulate a delay in the response
    setTimeout(() => {
      resolve(DemoGeneratedVersions.filter((version) => versionIds.includes(version.id)));
    }, 1000);
  });
};

export const performVersionAction = async (versions: Version[], action: VersionAction): Promise<Version[]> => {
  switch (action) {
    case VersionAction.Pause:
      return handleVersionActionForRunningVersions(versions, action);
    case VersionAction.Reject:
    case VersionAction.Approve:
      return handleVersionActionForPendingVersions(versions, action);
    default:
      console.error("Unknown version action, returning versions as is", action);
      return versions;
  }
};

const handleVersionActionForPendingVersions = (versions: Version[], action: VersionAction): Version[] => {
  return versions
    .filter((version) => {
      return version.status === VersionStatus.Pending;
    })
    .map((version) => {
      switch (action) {
        case VersionAction.Approve:
          return {
            ...version,
            status: VersionStatus.Running,
          };
        case VersionAction.Reject:
          return {
            ...version,
            status: VersionStatus.Rejected,
          };
        default:
          console.error("Unknown version action, returning versions as is", action);
          return version;
      }
    });
};

const handleVersionActionForRunningVersions = (versions: Version[], action: VersionAction): Version[] => {
  return versions
    .filter((version) => {
      return version.status === VersionStatus.Running;
    })
    .map((version) => {
      switch (action) {
        case VersionAction.Pause:
          return {
            ...version,
            status: VersionStatus.Pending,
          };
        default:
          console.error("Unknown version action, returning versions as is", action);
          return version;
      }
    });
};
