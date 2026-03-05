"use server";

import { nextAuthConfig } from "@/next-auth/next-auth.config";
import { getServerSession } from "next-auth";

export async function getMyToken() {
  const session = await getServerSession(nextAuthConfig);

  return session?.user?.realTokenFromBackEnd ?? null;
}
