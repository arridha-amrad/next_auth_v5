import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  imgUrl: text("img_url").notNull(),
  password: text("password").notNull(),
  provider: varchar("provider").notNull().default("credentials"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
