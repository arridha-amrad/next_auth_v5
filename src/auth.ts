import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import db from "./drizzle/db";
import {
  DbsAccountsTable,
  DbsSessionsTable,
  DbsUsersTable,
  DbsVerificationTokensTable,
} from "./drizzle/schema";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db, {
    accountsTable: DbsAccountsTable,
    usersTable: DbsUsersTable,
    sessionsTable: DbsSessionsTable,
    verificationTokensTable: DbsVerificationTokensTable,
  }),
  pages: {
    signIn: "/signin",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials: any) {
        let user: User | null = null;
        try {
          const res = await fetch(
            "http://localhost:3000/api/credentials-login",
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!res.ok) {
            return null;
          }
          const data = await res.json();
          user = data.user;
        } catch (err) {
          throw err;
        } finally {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // @ts-ignore
      session.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        image: user.image,
        name: user.name,
        createdAt: user.createdAt,
      };
      return session;
    },
  },
});
