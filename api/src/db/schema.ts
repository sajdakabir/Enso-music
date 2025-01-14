import {
    pgEnum,
    pgTable,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
    boolean,
    foreignKey,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["admin", "user"]);

export const User = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        displayName: varchar("displayName"),
        email: varchar("email").notNull(),
        profileUrl: varchar("profileUrl"),
        image: varchar("image"),
        role: UserRole("role").default("user"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at"),
    },
    (table) => ({
        emailIdx: uniqueIndex("email_idx").on(table.email),
    })
);

export const Integration = pgTable(
    "integrations",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id").notNull(),
        provider: varchar("provider").notNull(),
        accessToken: varchar("access_token").notNull(),
        refreshToken: varchar("refresh_token").notNull(),
        connected: boolean("connected").default(false),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at"),
    },
    (table) => ({
        userFk: foreignKey({
            columns: [table.userId],
            foreignColumns: [User.id],
        }),
    })
);
