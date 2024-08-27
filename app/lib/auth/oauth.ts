"use server";

import { generateCodeVerifier, generateState } from "arctic";
import { github, google } from "./oauth-providers";

export async function googleAuth() {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["email"],
    });

    return { state, codeVerifier, url };
}

export async function githubAuth() {
    const state = generateState();
    const url = await github.createAuthorizationURL(state);

    return { state, url };
}
