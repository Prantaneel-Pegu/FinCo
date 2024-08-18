"use server";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users, UserInsert } from "./schema";

const db = drizzle(sql);

export async function createUser({ username, passwordHash }: UserInsert) {
    try {
        console.log(`Creating user ${username}.`);

        await db.insert(users).values({
            username: username,
            passwordHash: passwordHash,
        });

        console.log(`Successfully created user ${username}.`);
    } catch (error) {
        console.error(
            `Fatal Error: Could not create user ${username}.\n\n Error: ${error}`,
        );
    }
}

export async function getUserData() {
    const result = await db.select().from(users);
    return result;
}
