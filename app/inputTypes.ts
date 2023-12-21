export interface ShopifyInstallationRequestInput {
  hmac: string;
  host: string;
  shop: string;
  timestamp: string;
}

export type FetchAccessTokenTypes = {
  access_token: string;
  scope: string;
};
