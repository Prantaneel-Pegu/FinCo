import { cookies } from "next/headers";
import { generateCodeVerifier, OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { google } from "@/app/lib/auth/oauth-providers";
import { lucia } from "@/app/lib/auth/lucia";
import { getUserGoogle, setUserGoogle } from "@/db/db-actions";
import { error } from "console";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

    if (
        !code ||
        !storedCodeVerifier ||
        !state ||
        !storedState ||
        state !== storedState
    ) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            storedCodeVerifier,
        );
        const googleUserResponse = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            },
        );

        const googleUser: GoogleUser = await googleUserResponse.json();
        console.log(googleUser);

        const existingUser = await getUserGoogle(googleUser.sub);

        if (existingUser?.id) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }

        const userId = generateIdFromEntropySize(10); // 16 characters long

        console.log(
            await setUserGoogle(
                userId,
                "User",
                googleUser.sub,
                googleUser.email,
                googleUser.picture,
            ),
        );

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
        return new Response(null, {
            status: 302,
            headers: {
                Location: `/signup/profile-setup?user_id=${userId}`,
            },
        });
    } catch (e) {
        error(e);
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GoogleUser {
    sub: string;
    email: string;
    picture: string;
}
