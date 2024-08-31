"use client";

import Link from "next/link";
import { Button } from "@/app/ui/shadcn-components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/ui/shadcn-components/ui/card";
import { Input } from "@/app/ui/shadcn-components/ui/input";
import { Label } from "@/app/ui/shadcn-components/ui/label";
import { useState } from "react";
import { signUp } from "@/app/lib/auth/actions";

import { GithubIcon, GoogleIcon } from "../components/icons";
import { redirect } from "next/navigation";

export default function SignUpForm() {
    const [isPending, setIsPending] = useState(false);

    async function handleSignUp(formData: FormData) {
        setIsPending(true);
        console.log(await signUp(formData));
        setIsPending(false);
        redirect("/");
    }

    return (
        <form action={handleSignUp}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="signup-firstName">
                                    First name
                                </Label>
                                <Input
                                    id="signup-firstName"
                                    name="firstName"
                                    placeholder="Max"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="signup-lastName">
                                    Last name
                                </Label>
                                <Input
                                    id="signup-lastName"
                                    name="lastName"
                                    placeholder="Robinson"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input
                                id="signup-email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input
                                id="signup-password"
                                name="password"
                                type="password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full disabled:bg-gray-700"
                            disabled={isPending}
                        >
                            Create an account
                        </Button>
                        <Link href={"/signin/google"}>
                            <Button
                                variant="outline"
                                className="bg-cta relative w-full disabled:bg-gray-700"
                                type="button"
                                disabled={isPending}
                            >
                                <GoogleIcon className="absolute left-3 top-1/2 size-6 -translate-y-1/2" />
                                Sign Up with Google
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
                                Sign Up with GitHub
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
