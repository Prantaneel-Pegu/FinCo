import { useState } from "react";
import { Bell } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../shadcn-components/ui/popover";

export default function Component() {
    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        {
            id: 1,
            message: "Welcome to FinCo!",
            description:
                "Take your time to explore my website. I would love to hear any feedback you have. You can reach out to me on my X handle.",
        },
        {
            id: 2,
            message: "This is a demo account",
            description:
                "...which means you can customize and edit it all you want! This feature is meant to ease in new users to the UI and give them a hands-on approach with all the tools and functionalities.",
        },
    ];

    return (
        <article className="relative rounded-full border border-gray-500">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Bell size={26} className="m-4" />
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                        <div className="border-b border-gray-200 bg-gray-100 p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Notifications
                            </h2>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="p-4 hover:bg-gray-50"
                                >
                                    <p className="font-medium text-gray-800">
                                        {notification.message}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {notification.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {notifications.length === 0 && (
                            <p className="p-4 text-sm text-gray-500">
                                No new notifications
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </article>
    );
}
