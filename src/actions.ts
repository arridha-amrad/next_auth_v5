"use server";

import db from "./drizzle/db";
import { UsersTable } from "./drizzle/schema";
import argon from "argon2";

type TSignup = {
  name: string;
  email: string;
  password: string;
  imgUrl: string;
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
    email,
    imgUrl,
    name,
    password: hashedPassword,
  });

  await new Promise((res, rej) => {
    return setTimeout(res, 3000);
  });
};
