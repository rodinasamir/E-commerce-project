import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "fresh cart",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (credentials) {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );

        const finalRes = await res.json();

        if (finalRes.message !== "success") return null;

        return {
          ...finalRes.user,
          realTokenFromBackEnd: finalRes.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.realTokenFromBackEnd = user.realTokenFromBackEnd;
      }
      return token;
    },
    session({ session, token }) {
      session.user.realTokenFromBackEnd = token.realTokenFromBackEnd;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    maxAge: 60 * 60 * 24,
  },
};
