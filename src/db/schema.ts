import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

  
export const users = pgTable("users",{
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    email: varchar("email").unique(),
    createdAt: timestamp("created_at").defaultNow(),
})