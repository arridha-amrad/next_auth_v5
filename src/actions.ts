"use server";

import db from "./drizzle/db";
import { UsersTable } from "./drizzle/schema";
import argon from "argon2";
import getSession from "./utils/getSession";
import { eq } from "drizzle-orm";
import { signIn } from "./auth";
import { User } from "next-auth";
import { redirect } from "next/navigation";

type TSignup = {
  name: string;
  email: string;
  password: string;
  imgUrl: string;
};

type TSignin = {
  email: string;
  password: string;
};

export const signinAction = async (data: FormData) => {
  const { email, password } = Object.fromEntries(data.entries()) as TSignin;
  const [user] = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email));

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await argon.verify(user.password, password);
  if (!isMatch) {
    throw new Error("Password not match");
  }

  const myUser: User = {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    image: user.imgUrl,
    role: user.role,
  };

  console.log("my user : ", myUser);

  await signIn("credentials", { ...myUser, redirect: false });
  redirect("/");
};

export const signupAction = async (data: FormData) => {
  const { email, imgUrl, name, password } = Object.fromEntries(
    data.entries()
  ) as TSignup;

  if (!email || !imgUrl || !name || !password) {
    throw new Error("Please fill the required input");
  }

  const hashedPassword = await argon.hash(password);

  await db.insert(UsersTable).values({
    provider: "credentials",
    email,
    imgUrl,
    name,
    password: hashedPassword,
  });
};

export const updateUser = async (data: FormData) => {
  const session = await getSession();
  const name = data.get("name") as string | null;
  const userId = session?.user.id;
  if (!name || !userId) return;
  const result = await db
    .update(UsersTable)
    .set({
      name,
    })
    .where(eq(UsersTable.id, Number(userId)))
    .returning({
      id: UsersTable.id,
      name: UsersTable.name,
      email: UsersTable.email,
      image: UsersTable.imgUrl,
      role: UsersTable.role,
    });
  return result;
};
