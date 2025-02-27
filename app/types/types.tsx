import type { ProductStatus, VersionStatus } from "./enums";

export interface Product {
  id: number;
  externalId: string;
  storeId: number;
  status: ProductStatus;
  title: string;
  handle: string;
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
  createdAt: Date;
  link?: string;
}

export interface VersionStatistics {
  views: number;
  conversionRate: number;
  marginalRevenue: number;
  displayPercentage: number;
  addToCartRate: number;
  conversionRateLift: number;
  addToCartRateLift: number;
}

export interface Image {
  id: number;
  url: string;
  product_id: number;
  alt: string;
  ai_description: string;
}

export interface VersionWithOriginalTitle extends Version {
  originalProductTitle: string;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  status: string;
  storeSettings: StoreSettings;
}

export interface StoreSettings {
  bannedWords: string[];
  selectImageInstructions: string;
  generateDescriptionInstructions: string;
  exampleDescription: string;
}
