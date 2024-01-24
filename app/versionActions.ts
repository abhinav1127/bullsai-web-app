import { DemoGeneratedVersions } from "./SampleData";
import type { Version } from "./types/types";

export const pollForVersionUpdates = async (versionIds: number[]): Promise<Version[]> => {
  return new Promise((resolve) => {
    // Simulate a delay in the response
    setTimeout(() => {
      resolve(DemoGeneratedVersions.filter((version) => versionIds.includes(version.id)));
    }, 1000);
  });
};
