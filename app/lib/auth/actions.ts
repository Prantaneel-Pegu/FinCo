"use server";

import { hash, verify } from "argon2";
import { createUser, getUserData } from "@/db/db-actions";
import { lucia } from "./lucia";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateRequest } from "./validate-request";
import { revalidatePath } from "next/cache";

type SignUpResult = {
    result?: string;
    error?: string;
};

export async function signUp(formData: FormData): Promise<SignUpResult> {
    try {
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");

        const userName = firstName + " " + lastName;
        const userId = generateIdFromEntropySize(10);

        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            return {
                error: "Invalid password",
            };
        }

        console.log(firstName + " " + lastName);

        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            hashLength: 32,
            parallelism: 1,
        });

        const result = await createUser({
            id: userId,
            userName: userName,
            email: email as string,
            passwordHash: passwordHash,
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: `A Fatal Error Occurred: ${error.message}`,
            };
        } else {
            console.error("An Uncommon Fatal Error Occurred: ", error);
        }
    } finally {
        return redirect("/");
    }

    return {
        result: "Successfully Signed In User",
    };
}

export async function login(formData: FormData) {
    const userEmail = formData.get("email") as string;
    const password = formData.get("password");

    console.log(userEmail, password);

    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return {
            error: "Invalid password",
        };
    }

    const existingUser = await getUserData(userEmail);
    console.log(existingUser);

    if (!existingUser) {
        return {
            error: "Incorrect email or password",
        };
    }

    const validPassword = await verify(existingUser.passwordHash, password);
    if (!validPassword) {
        return {
            error: "Incorrect email or password",
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    console.log("Successful SignIn!");

    return redirect("/");
}

export async function signOut() {
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
}
