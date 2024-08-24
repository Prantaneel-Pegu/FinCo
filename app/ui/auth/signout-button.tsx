"use client";

import { signOut } from "@/app/lib/auth/actions";
import { reloadClientPage } from "@/app/lib/utils";
import { useState } from "react";

export default function SignOutButton() {
    const [isPending, setIsPending] = useState(false);

    async function handleSignOut() {
        setIsPending(true);
        await signOut();
        setIsPending(false);
        reloadClientPage();
    }

    return (
        <form action={handleSignOut}>
            <button
                type="submit"
                className="mx-auto block rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800 active:bg-slate-800"
            >
                Sign out
            </button>
        </form>
    );
}
