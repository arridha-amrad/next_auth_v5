"use server";

import db from "./drizzle/db";
import { DbsUsersTable, UsersTable } from "./drizzle/schema";
import argon from "argon2";
import getSession from "./utils/getSession";
import { eq } from "drizzle-orm";

type TSignup = {
  name: string;
  email: string;
  password: string;
  image: string;
};

type TSignin = {
  email: string;
  password: string;
};

export const signinAction = async (data: FormData) => {
  const { email, password } = Object.fromEntries(data.entries()) as TSignin;
  const user = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email));

  if (user.length === 0) {
    throw new Error("User not found");
  }

  const isMatch = await argon.verify(user[0].password, password);
  if (!isMatch) {
    throw new Error("Password not match");
  }
  return {
    id: user[0].id,
    name: user[0].name,
    email: user[0].email,
    image: user[0].imgUrl,
  };
};

export const signupAction = async (data: FormData) => {
  const { email, image, name, password } = Object.fromEntries(
    data.entries()
  ) as TSignup;

  if (!email || !image || !name || !password) {
    throw new Error("Please fill the required input");
  }
  const hashedPassword = await argon.hash(password);
  const isEmailRegistered = await db
    .select()
    .from(DbsUsersTable)
    .where(eq(DbsUsersTable.email, email));

  if (isEmailRegistered.length > 0) {
    throw new Error("Email has been registered");
  }

  await db.insert(DbsUsersTable).values({
    email,
    image,
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
      avatar: UsersTable.imgUrl,
    });
  return result;
};
