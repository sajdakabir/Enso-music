ALTER TABLE "users" ADD COLUMN "displayName" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profileUrl" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";