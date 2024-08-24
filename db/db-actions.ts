"use server";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users, UserInsert } from "./schema";
import { db } from "./adapter";
import { eq } from "drizzle-orm";

export async function createUser({
    id,
    userName,
    email,
    passwordHash,
}: UserInsert) {
    try {
        console.log(`Creating user ${userName}.`);

        await db.insert(users).values({
            id: id,
            userName: userName,
            email: email,
            passwordHash: passwordHash,
        });

        console.log(`Successfully created user ${userName}.`);
        return `Successfully created user ${userName}.`;
    } catch (error) {
        console.error(
            `Fatal Error: Could not create user ${userName}.\n\n Error: ${error}`,
        );
        return `Fatal Error: Could not create user ${userName}.\n\n Error: ${error}`;
    }
}

export async function getUserData(userEmail: string) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, userEmail))
        .limit(1);

    if (user.id) {
        return user;
    } else return null;
}

export async function getAllUsersData() {
    const result = await db.select().from(users);
    return result;
}
