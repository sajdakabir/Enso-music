import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

  
export const user = pgTable("users",{
    id: uuid("id").primaryKey().defaultRandom(),
    displayName: varchar("displayName"),
    email: varchar("email").unique(),
    profileUrl: varchar("profileUrl"),
    image: varchar("image"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
})
