import { pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["admin", "user"]);
  
export const User = pgTable("users",{
    id: uuid("id").primaryKey().defaultRandom(),
    displayName: varchar("displayName"),
    email: varchar("email").notNull(),
    profileUrl: varchar("profileUrl"),
    image: varchar("image"),
    role: UserRole("role").default("user"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
}, (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
}))
