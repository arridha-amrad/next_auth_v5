import { verify } from "argon2";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "~/drizzle/db";
import { DbsUsersTable } from "~/drizzle/schema";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await db
    .select()
    .from(DbsUsersTable)
    .where(eq(DbsUsersTable.email, email));
  if (user.length <= 0) {
    return NextResponse.json({ message: "User not found" });
  }
  const dbUser = user[0];
  const dbUserPassword = dbUser.password;
  if (!dbUserPassword) {
    return NextResponse.json(
      { message: "Plase try another auth strategy" },
      { status: 400 }
    );
  }
  const isMatch = await verify(dbUserPassword, password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid password" }, { status: 400 });
  }

  const { password: pwd, ...props } = dbUser;

  return NextResponse.json({ user: props }, { status: 200 });
}
