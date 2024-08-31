"use server";

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
            name: userName,
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

    if (user?.id) {
        return user;
    } else return null;
}

export async function getAllUsersData() {
    const result = await db.select().from(users);
    return result;
}

export async function getUserGithub(githubId: string) {
    const [userGithub] = await db
        .select()
        .from(users)
        .where(eq(users.githubId, githubId))
        .limit(1);

    if (userGithub?.id) {
        return userGithub;
    } else return null;
}

export async function setUserGithub(
    id: string,
    githubId: string,
    githubUsername: string,
) {
    const result = await db.insert(users).values({
        id: id,
        githubId: githubId,
        name: githubUsername,
        userName: githubUsername,
    });

    return result;
}

export async function getUserGoogle(googleid: string) {
    const [userGoogle] = await db
        .select()
        .from(users)
        .where(eq(users.googleId, googleid))
        .limit(1);

    if (userGoogle?.id) {
        return userGoogle;
    } else return null;
}

export async function updateUserProfile(
    userId: string,
    name: string,
    userName: string,
) {
    try {
        await db
            .update(users)
            .set({
                name: name,
                userName: userName,
            })
            .where(eq(users.id, userId));

        return "Successfully Setup User Profile";
    } catch (error) {
        return `Encountered an Error: ${error}`;
    }
}

export async function setUserGoogle(
    id: string,
    userName: string,
    googleId: string,
    googleEmail: string,
    googlePfp: string,
) {
    const result = await db.insert(users).values({
        id: id,
        name: userName,
        userName: userName,
        googleId: googleId,
        email: googleEmail,
        userPfp: googlePfp,
    });

    return result;
}
