import { pgSchema, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const fincoSchema = pgSchema("finco");

export const users = fincoSchema.table("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("user_name", { length: 256 }),
    passwordHash: varchar("pass_hash", { length: 4096 }),
});

export const userData = fincoSchema.table("userData", {
    id: uuid("id").primaryKey().defaultRandom(),
    netWorth: integer("net_worth"),
});

export type UserSelect = typeof users.$inferSelect; 
export type UserInsert = typeof users.$inferInsert; 

