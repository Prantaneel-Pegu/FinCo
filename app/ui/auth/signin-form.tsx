"use client";

import Link from "next/link";
import { Label } from "../shadcn-components/ui/label";
import { Button } from "../shadcn-components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../shadcn-components/ui/card";
import { Input } from "../shadcn-components/ui/input";
import { useState } from "react";
import { login } from "@/app/lib/auth/actions";
import { reloadClientPage } from "@/app/lib/utils";

export default function SignInForm() {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    async function handleSignIn(formData: FormData) {
        setIsPending(true);
        const result = await login(formData);
        console.log(result);
        setError(result?.error ? result.error : "No Errors");
        reloadClientPage();
    }

    return (
        <form action={handleSignIn}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="signin-email">Email</Label>
                            <Input
                                id="signin-email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="signin-password">
                                    Password
                                </Label>
                                <Link
                                    href="#"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="signin-password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Github
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
            {
                <p className="mt-8 text-center text-xl">
                    {isPending ? "Pending..." : "Not Pending"} <br />{" "}
                    {error ? error : "No errors"}
                </p>
            }
        </form>
    );
}
