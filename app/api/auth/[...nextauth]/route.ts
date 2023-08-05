import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

import { Links } from "@/config/links";
import { apiLinks } from "@/config/api-links";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: Links.signin.href,
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Signin with email",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await fetch(apiLinks.login, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok || !data) {
          throw new Error("Some error occurred");
        }
        if (!data.status) {
          throw new Error(data.message);
        }
        return data;
      },
    }),
  ],
  callbacks: {
    // user is what we returned from authorize function & token is the newly created token
    jwt({ user, token }) {
      if (user?.isAdmin) {
        token.isAdmin = user.isAdmin;
        token.token = user.token;
        token.name = user.name;
      }
      return token;
    },
    // session is the object that will be expose to frontend
    session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin;
        session.user.token = token.token;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
