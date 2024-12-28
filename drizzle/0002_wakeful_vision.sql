CREATE TYPE "public"."userRole" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "userRole" DEFAULT 'user';--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");