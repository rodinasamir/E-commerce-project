import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    role?: string;
    user: {
      name?: string | null;
      email?: string | null;
      role?: string;
      realTokenFromBackEnd?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    realTokenFromBackEnd?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realTokenFromBackEnd?: string;
  }
}