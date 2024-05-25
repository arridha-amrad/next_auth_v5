import { DefaultSession } from "next-auth";
import { DbsUsersTable } from "~/drizzle/schema";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    role: string | null;
    createdAt: Date;
  }
}

type TUser = Omit<typeof DbsUsersTable.$inferSelect, "password">;

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: number;
    email: string;
    role: string | null;
    image: string;
    name: string;
    createdAt: Date;
  }
}
