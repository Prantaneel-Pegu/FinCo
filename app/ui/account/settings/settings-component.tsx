"use client";

import {
    CurrencyData,
    UpdateCurrencyData,
    UpdateUserData,
    UserData,
} from "@/app/lib/types";
import { Input } from "../../shadcn-components/ui/input";
import { Pencil } from "lucide-react";
import AvatarSelector from "./avatar-selector";
import { Button } from "../../shadcn-components/ui/button";
import { FormEvent, useState } from "react";
import debounce from "lodash.debounce";

export default function SettingsComponent({
    userData,
    updateUserData: { updateUserData },
    currencyData,
    updateCurrencyData: { updateCurrencyData },
}: {
    userData: UserData;
    updateUserData: { updateUserData: UpdateUserData };
    currencyData: CurrencyData;
    updateCurrencyData: { updateCurrencyData: UpdateCurrencyData };
}) {
    const [profileUpdateText, setProfileUpdateText] = useState<{
        updateText: string;
        textTimeout: any;
    }>({ updateText: "", textTimeout: 0 });

    const [passwordUpdateText, setPasswordUpdateText] = useState<{
        updateText: string;
        textTimeout: any;
    }>({ updateText: "", textTimeout: 0 });

    function handlePersonalInfoUpdate(rawFormData: FormData) {
        const formData = Object.fromEntries(rawFormData.entries());

        const fullName = formData["fullName"]?.toString() || userData.name;
        const userName = formData["userName"]?.toString() || userData.userName;
        const email = formData["email"]?.toString() || userData.email;

        updateUserData({
            ...userData,
            name: fullName,
            userName: userName,
            email: email,
        });

        clearTimeout(profileUpdateText.textTimeout);
        const newTextTimeout = setTimeout(
            () =>
                setProfileUpdateText({
                    ...profileUpdateText,
                    updateText: "",
                }),
            3500,
        );
        setTimeout(
            () =>
                setProfileUpdateText({
                    ...profileUpdateText,
                    updateText: "Profile Successfully Updated!",
                    textTimeout: newTextTimeout,
                }),
            250,
        );
        setProfileUpdateText({
            ...profileUpdateText,
            textTimeout: newTextTimeout,
        });
    }

    function handlePasswordUpdate(rawFormData: FormData) {
        const formData = Object.fromEntries(rawFormData.entries());

        // Awaiting implementation

        clearTimeout(passwordUpdateText.textTimeout);
        const newTextTimeout = setTimeout(
            () =>
                setPasswordUpdateText({
                    ...passwordUpdateText,
                    updateText: "",
                }),
            3500,
        );
        setTimeout(
            () =>
                setPasswordUpdateText({
                    ...passwordUpdateText,
                    updateText: "Password Successfully Updated!",
                    textTimeout: newTextTimeout,
                }),
            250,
        );
        setPasswordUpdateText({
            ...passwordUpdateText,
            textTimeout: newTextTimeout,
        });
    }

    const debouncedPiUpdate = debounce(
        (form: EventTarget & HTMLFormElement) =>
            handlePersonalInfoUpdate(new FormData(form)),
        300,
    );
    const debouncedPassUpdate = debounce(
        (form: EventTarget & HTMLFormElement) =>
            handlePasswordUpdate(new FormData(form)),
        300,
    );

    return (
        <main className="mb-80 px-5 lg:px-12">
            <section className="mb-8">
                <h1 className="mt-6 text-2xl font-semibold">
                    Account Settings
                </h1>
            </section>

            <section className="mb-8 max-w-md gap-4 rounded-lg border border-gray-500 px-4 py-4 shadow-md">
                <h2 className="mb-6 text-xl font-medium">
                    Personal Information
                </h2>

                <div className="mx-auto mb-12 w-max lg:mb-8">
                    <div className="group relative">
                        <div className="mx-auto size-[68px]">
                            <AvatarSelector
                                defaultAvatar={userData.avatarLink}
                            />
                        </div>

                        {/* For Desktops only */}
                        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:group-hover:block">
                            <Pencil color="white" size={28} />
                        </div>
                    </div>
                </div>

                <form
                    className=""
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        debouncedPiUpdate(e.currentTarget);
                    }}
                >
                    <section className="mb-8 flex flex-col gap-6">
                        <div>
                            <p className="mb-2">Full Name: </p>
                            <Input
                                name="fullName"
                                defaultValue={userData.name}
                                minLength={3}
                                required
                            />
                        </div>
                        <div>
                            <p className="mb-2">Username: </p>
                            <Input
                                name="userName"
                                defaultValue={userData.userName}
                                minLength={3}
                                required
                            />
                        </div>
                        <div>
                            <p className="mb-2">Email Address: </p>
                            <Input
                                name="email"
                                defaultValue={userData.email}
                                type="email"
                                minLength={6}
                                required
                            />
                        </div>
                    </section>
                    <div className="flex items-center gap-4">
                        <Button
                            type="submit"
                            className="bg-accent text-white hover:bg-secondary"
                        >
                            Save
                        </Button>
                        <p className="text-sm text-success-dark">
                            {profileUpdateText.updateText}
                        </p>
                    </div>
                </form>
            </section>
            {/* Fix form updates and update text; maybe password hide */}
            <section className="max-w-md gap-4 rounded-lg border border-gray-500 px-4 py-4 shadow-md">
                <h2 className="mb-8 text-xl font-medium">Security Settings</h2>
                <form
                    className=""
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        debouncedPassUpdate(e.currentTarget);
                    }}
                >
                    <section className="mb-6">
                        <div>
                            <p className="mb-2">Change Password: </p>
                            <Input
                                placeholder="Enter new password"
                                type="password"
                                minLength={8}
                                required
                            />
                        </div>
                    </section>
                    <div className="flex items-center gap-4">
                        <Button
                            type="submit"
                            className="bg-accent text-white hover:bg-secondary"
                        >
                            Save
                        </Button>
                        <p className="text-sm text-success-dark">
                            {passwordUpdateText.updateText}
                        </p>
                    </div>
                </form>
            </section>
        </main>
    );
}
