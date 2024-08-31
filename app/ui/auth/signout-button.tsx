"use client";

import { signOut } from "@/app/lib/auth/actions";
import { reloadClientPage } from "@/app/lib/utils";
import { useState } from "react";
import { Button } from "../shadcn-components/ui/button";

type Props = {
    className?: string;
};

export default function SignOutButton({ className }: Props) {
    const [isPending, setIsPending] = useState(false);

    async function handleSignOut() {
        setIsPending(true);
        await signOut();
        setIsPending(false);
        reloadClientPage();
    }

    return (
        <Button
            onClick={handleSignOut}
            className={`bg-accent ${className} w-full`}
        >
            Sign out
        </Button>
    );
}
