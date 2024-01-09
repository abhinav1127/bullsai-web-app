import type { ProductStatus, VersionStatus } from "./enums";

export interface Product {
  id: number;
  externalId: string;
  storeId: number;
  status: ProductStatus;
  title: string;
  statistics: ProductStatistics;
  versions: Version[];
  defaultVersionId: number;
}

export interface ProductStatistics {
  views: number;
  conversionRateLift?: number;
  marginalRevenue?: number;
  personalizedPercentage?: number;
  addToCartRateLift?: number;
}

export interface Version {
  id: number;
  productId: number;
  versionTitle: string;
  status: VersionStatus;
  productTitle: string;
  heroImage: string;
  description: string;
  attributes: string[];
  statistics: VersionStatistics;
}

export interface VersionStatistics {
  views: number;
  conversionRate: number;
  marginalRevenue: number;
  displayPercentage: number;
  addToCartRate: number;
}
