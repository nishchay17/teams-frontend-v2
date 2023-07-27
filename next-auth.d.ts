import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      isAdmin?: boolean;
      token?: string;
    };
  }
  interface User {
    name: string;
    isAdmin: boolean;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    status: boolean;
    token?: string;
    isAdmin?: boolean;
    name?: string;
  }
}
