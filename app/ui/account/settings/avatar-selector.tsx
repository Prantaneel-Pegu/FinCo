"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../shadcn-components/ui/dialog";
import { Button } from "../../shadcn-components/ui/button";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "../../shadcn-components/ui/avatar";
import { Pencil } from "lucide-react";

export default function AvatarSelector({
    defaultAvatar,
}: {
    defaultAvatar: string;
}) {
    const avatars = [
        defaultAvatar,
        "https://robohash.org/1",
        "https://robohash.org/2",
        "https://robohash.org/3",
        "https://robohash.org/4",
        "https://robohash.org/5",
        "https://robohash.org/88",
        "https://robohash.org/8",
        "https://robohash.org/16",
    ];

    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button
                        variant="outline"
                        className="h-full w-full overflow-hidden rounded-full p-0 transition-transform duration-200 hover:scale-105"
                    >
                        <Avatar className="h-full w-full">
                            <AvatarImage
                                src={selectedAvatar}
                                alt="Profile picture"
                            />
                            <AvatarFallback>AVTR</AvatarFallback>
                        </Avatar>
                    </Button>
                    {/* For mobiles */}
                    <div>
                        {/* Set open/close props here to open avatar selector dialog on click. See avatar component comment */}
                        <p className="flex w-max -translate-x-[22px] items-center gap-1 text-center text-sm lg:hidden">
                            <span>Change Avatar</span>
                            <span>
                                <Pencil size={16} />
                            </span>
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent
                className="max-w-max sm:px-8"
                aria-describedby="#none"
            >
                <DialogHeader>
                    <DialogTitle className="sm:text-2xl">
                        Choose your profile picture
                    </DialogTitle>
                    <DialogDescription className="hidden">
                        Avatar Selector
                    </DialogDescription>
                </DialogHeader>
                <div className="mx-auto grid grid-cols-3 gap-5 py-4">
                    {avatars.map((avatar, index) => (
                        <Button
                            key={avatar}
                            variant="outline"
                            className={`size-[80px] overflow-hidden rounded-lg p-0 transition-all duration-200 hover:scale-105 sm:size-[100px] ${
                                selectedAvatar === avatar
                                    ? "ring-2 ring-primary"
                                    : ""
                            }`}
                            onClick={() => setSelectedAvatar(avatar)}
                        >
                            <Avatar className="h-full w-full">
                                <AvatarImage
                                    src={avatar}
                                    alt={`Avatar option ${index + 1}`}
                                />
                                <AvatarFallback>{index + 1}</AvatarFallback>
                            </Avatar>
                        </Button>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                    <div className="transform transition-all duration-300 ease-in-out hover:scale-110">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={selectedAvatar}
                                alt="Selected profile picture"
                            />
                            <AvatarFallback>AVTR</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
            </DialogContent>
        </Dialog>
    );
}
