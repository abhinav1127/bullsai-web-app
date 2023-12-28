export interface QueryParams {
  [key: string]: string;
}

export interface ShopifySession {
  shop: string;
  scopes: string[];
  accessToken: string;
  expires: number;
}

export function getValidShopifySession(session: any): ShopifySession | null {
  if (
    session &&
    typeof session.shop === "string" &&
    Array.isArray(session.scopes) &&
    typeof session.accessToken === "string" &&
    typeof session.expires === "number" &&
    session.expires >= Date.now()
  ) {
    return session as ShopifySession;
  }

  return null;
}

export interface AuthRedirectInfo {
  authorizationUrl: string;
  nonce: string;
}
