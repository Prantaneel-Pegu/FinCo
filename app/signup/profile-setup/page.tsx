"use server";

import { Button } from "@/app/ui/shadcn-components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/app/ui/shadcn-components/ui/card";
import { Input } from "@/app/ui/shadcn-components/ui/input";
import { updateUserProfile } from "@/db/db-actions";
import { Label } from "@radix-ui/react-label";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default async function ProfileSetup() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user_id");

    if (!userId) redirect("/");

    async function handleProfileSetup(formData: FormData) {
        console.log(
            await updateUserProfile(
                userId!,
                formData.get("name") as string,
                formData.get("username") as string,
            ),
        );

        redirect("/");
    }

    return (
        <main>
            <Card className="mx-auto w-[350px]">
                <CardHeader>
                    <CardTitle>Create your profile</CardTitle>
                    <CardDescription>
                        Choose something nice for yourself
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={handleProfileSetup}
                        className="flex flex-col gap-4"
                    >
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="profileSetupName">Name</Label>
                                <Input
                                    id="profileSetupName"
                                    name="name"
                                    placeholder="Marco Brownie"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="profileSetupUsername">
                                    Username
                                </Label>
                                <Input
                                    id="profileSetupUsername"
                                    name="username"
                                    placeholder="pricklypear213"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-4">
                            Create
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
