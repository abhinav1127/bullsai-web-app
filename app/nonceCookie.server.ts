import { createCookie } from "@remix-run/node"; // or cloudflare/deno

if (!process.env.NONCE_COOKIE_SECRET_KEY) {
  throw new Error("Missing NONCE_COOKIE_SECRET_KEY environment variable");
}

const secretKey = process.env.NONCE_COOKIE_SECRET_KEY; // Store this securely

export const signedNonceCookie = createCookie("nonce", {
  secrets: [secretKey],
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});

export async function setSignedNonceCookie(nonceValue: string) {
  return await signedNonceCookie.serialize(nonceValue);
}

export async function readSignedNonceCookie(cookieHeader: string | null): Promise<string | null> {
  try {
    const parsedValue = await signedNonceCookie.parse(cookieHeader);
    console.log("parsedValue", parsedValue);
    return parsedValue;
  } catch (error) {
    console.error("Error reading nonce cookie:", error);
    return null;
  }
}
