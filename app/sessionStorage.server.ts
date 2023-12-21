import { createCookie, createSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import prisma from "./prisma.server";
import type { merchant_sessions } from "@prisma/client";

if (!process.env.SESSION_COOKIE_SECRET_KEY) {
  throw new Error("Missing SESSION_COOKIE_SECRET_KEY environment variable");
}

const secretKey = process.env.SESSION_COOKIE_SECRET_KEY;

const cookie = createCookie("__session", {
  secrets: [secretKey],
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
const { getSession, commitSession, destroySession } = createSessionStorage({
  cookie,
  async createData(data: Partial<merchant_sessions>, expires: Date | undefined) {
    console.log("createData", data);
    const session = await prisma.merchant_sessions.create({
      data: {
        ...data,
        session: data.session ? data.session : {},
        // id and created_at will be handled by PostgreSQL as per schema defaults
      },
    });
    return session.id.toString(); // Convert BigInt to string
  },
  async readData(id: string) {
    return await prisma.merchant_sessions.findUnique({
      where: { id: BigInt(id) }, // Convert string to BigInt
    });
  },
  async updateData(id: string, data: Partial<merchant_sessions>, expires: Date | undefined) {
    console.log("updateDataId", id);
    console.log("updateData", data);
    await prisma.merchant_sessions.update({
      where: { id: BigInt(id) }, // Convert string to BigInt
      data: {
        ...data,
        session: data.session ? data.session : {},
      },
    });
  },
  async deleteData(id: string) {
    await prisma.merchant_sessions.delete({
      where: { id: BigInt(id) }, // Convert string to BigInt
    });
  },
});

export { getSession, commitSession, destroySession };
