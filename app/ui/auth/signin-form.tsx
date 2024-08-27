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
import { GoogleIcon, GithubIcon } from "../components/icons";

export default function SignInForm() {
    const [isPending, setIsPending] = useState(false);

    async function handleSignIn(formData: FormData) {
        setIsPending(true);
        console.log(await login(formData));
        setIsPending(false);
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
                        <Link href={"/signin/google"}>
                            <Button
                                variant="outline"
                                className="bg-cta relative w-full disabled:bg-gray-700"
                                type="button"
                                disabled={isPending}
                            >
                                <GoogleIcon className="absolute left-3 top-1/2 size-6 -translate-y-1/2" />
                                Login with Google
                            </Button>
                        </Link>
                        <Link href={"/signin/github"}>
                            <Button
                                variant="outline"
                                className="bg-cta relative w-full disabled:bg-gray-700"
                                type="button"
                                disabled={isPending}
                            >
                                <GithubIcon className="absolute left-1 top-1/2 !size-10 -translate-y-1/2" />
                                Login with GitHub
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
