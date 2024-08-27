import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequestInMiddleware } from "./app/lib/auth/validate-middleware-request";

export async function middleware(request: NextRequest) {
    const user = await validateRequestInMiddleware();

    if (!user.user) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: "/dashboard",
};
