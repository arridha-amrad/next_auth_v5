DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('BASIC', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'BASIC';