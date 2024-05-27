import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import Credentials from "next-auth/providers/credentials";
import db from "./drizzle/db";
import { UsersTable } from "./drizzle/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    GitHub,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      authorize: async (credentials: any) => {
        const user: User = {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          role: "BASIC",
          avatar: credentials.imgUrl,
          image: credentials.imgUrl,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "credentials") {
        return true;
      }
      const { email: em, name, image } = user;
      if (em && name && image) {
        await db
          .insert(UsersTable)
          .values({
            email: em,
            imgUrl: image,
            name,
            password: "",
            provider: account?.provider,
          })
          .onConflictDoNothing();
        return true;
      } else {
        return "/signin?e=invalid credentials";
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user && user.email) {
        const [dbUser] = await db
          .select({
            id: UsersTable.id,
            name: UsersTable.name,
            email: UsersTable.email,
            avatar: UsersTable.imgUrl,
          })
          .from(UsersTable)
          .where(eq(UsersTable.email, user.email));
        token.user = { ...dbUser };
      }

      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }

      console.log({ token });

      return token;
    },
    async session({ session, token, trigger }) {
      session.user = token.user as any;
      console.log({ session });
      return session;
    },
  },
});
