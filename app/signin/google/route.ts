import { googleAuth } from "@/app/lib/auth/oauth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const { state, codeVerifier, url } = await googleAuth();

    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // set to false in localhost
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax",
    });

    cookies().set("code_verifier", codeVerifier, {
        secure: process.env.NODE_ENV === "production", // set to false in localhost
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax",
    });

    return Response.redirect(url);
}
