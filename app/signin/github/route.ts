import { githubAuth } from "@/app/lib/auth/oauth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const { state, url } = await githubAuth();

    cookies().set("github_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax",
    });

    return Response.redirect(url);
}
