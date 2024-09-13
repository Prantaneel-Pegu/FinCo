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

    const [open, setOpen] = useState(false); // set initial state using props
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                setOpen(!open);
            }}
        >
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                aria-describedby="#none"
            >
                <DialogHeader>
                    <DialogTitle>Choose your profile picture</DialogTitle>
                    <DialogDescription className="hidden">
                        Avatar Selector
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                    {avatars.map((avatar, index) => (
                        <Button
                            key={avatar}
                            variant="outline"
                            className={`h-[100px] w-full overflow-hidden rounded-lg p-0 transition-all duration-200 hover:scale-105 ${
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
