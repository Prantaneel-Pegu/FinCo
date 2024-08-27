import { pgSchema, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const fincoSchema = pgSchema("finco");

export const users = fincoSchema.table("users", {
    id: varchar("id", { length: 256 }).primaryKey().unique().notNull(),
    name: varchar("name", { length: 256 }),
    userName: varchar("user_name", { length: 256 }).unique(),
    email: varchar("email", { length: 256 }).unique(),
    passwordHash: varchar("password_hash", { length: 4096 }),
    userPfp: varchar("user_pfp", { length: 512 }),
    githubId: varchar("github_id", { length: 256 }).unique(),
    googleId: varchar("google_id", { length: 256 }).unique(),
});

export const sessions = fincoSchema.table("sessions", {
    id: varchar("id", { length: 256 }).primaryKey().notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});

// export const userData = fincoSchema.table("userData", {
//     id: uuid("id").primaryKey().defaultRandom(),
//     netWorth: integer("net_worth"),
// });

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
