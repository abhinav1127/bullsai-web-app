export enum ProductStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum ProductAction {
  Activate = "Activate",
  Deactivate = "Deactivate",
}

export enum VersionAction {
  Approve = "Approve",
  Reject = "Reject",
  Pause = "Pause",
  Update = "Update",
}

export function getPastTense(versionAction: VersionAction | undefined): string {
  switch (versionAction) {
    case VersionAction.Approve:
      return "Approved";
    case VersionAction.Reject:
      return "Rejected";
    case VersionAction.Pause:
      return "Paused";
    case VersionAction.Update:
      return "Updated";
    case undefined:
      // if undefined, assume that it has just been generated
      return "Generated";
    default:
      return "";
  }
}

export enum VersionStatus {
  Default = "Default",
  Running = "Running",
  Pending = "Pending",
  Generating = "Generating",
  Rejected = "Rejected",
}

export enum ProductViewMode {
  Metrics = "Metrics",
  VersionDetails = "Version Details",
}

export enum ProductStatusFilter {
  AllProducts = "All Products",
  Active = "Active",
  Inactive = "Inactive",
}

export enum StoreStatus {
  Active = "Active",
  Inactive = "Inactive",
  Disabled = "Disabled",
}
