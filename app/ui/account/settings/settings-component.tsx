import { CurrencyData, UserData } from "@/app/lib/types";
import Image from "next/image";
import { Input } from "../../shadcn-components/ui/input";
import { Pencil } from "lucide-react";
import AvatarSelector from "./avatar-selector";

export default function SettingsComponent({
    userData,
    currencyData,
}: {
    userData: UserData;
    currencyData: CurrencyData;
}) {
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

                <div className="mx-auto mb-8 w-max">
                    <div className="group relative">
                        <div className="mx-auto size-[68px]">
                            <AvatarSelector
                                defaultAvatar={userData.avatarLink}
                            />
                        </div>

                        {/* For mobiles */}
                        <div>
                            {/* Set open/close props here to open avatar selector dialog on click. See avatar component comment */}
                            <p className="mt-3 flex items-center gap-1 text-center text-sm lg:hidden">
                                <span>Change Avatar</span>
                                <span>
                                    <Pencil size={16} />
                                </span>
                            </p>
                        </div>

                        {/* For Desktops */}
                        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:group-hover:block">
                            <Pencil color="white" size={28} />
                        </div>
                    </div>
                </div>

                <div className="mb-2 flex flex-col gap-6">
                    <div>
                        <p className="mb-2">Full Name: </p>
                        <Input defaultValue={userData.name} />
                    </div>
                    <div>
                        <p className="mb-2">Username: </p>
                        <Input defaultValue={userData.userName} />
                    </div>
                    <div>
                        <p className="mb-2">Email Address: </p>
                        <Input defaultValue={userData.email} />
                    </div>
                </div>
            </section>

            <section className="max-w-md gap-4 rounded-lg border border-gray-500 px-4 py-4 shadow-md">
                <h2 className="mb-6 text-xl font-medium">Security Settings</h2>
                <div className="">
                    <div>
                        <p className="mb-2">Change Password </p>
                        <Input placeholder="Enter new password" />
                    </div>
                </div>
            </section>
        </main>
    );
}
