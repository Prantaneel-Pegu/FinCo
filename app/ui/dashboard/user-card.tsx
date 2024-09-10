import { UserData } from "@/app/lib/types";
import Image from "next/image";
import DemoUserAvatar from "@/public/demoUserAvatar.jpg";

export default function DashboardUserCard({
    userData,
}: {
    userData: UserData;
}) {
    return (
        <article className="flex gap-4 rounded-full border border-gray-500 py-1 pl-1 pr-10">
            <Image
                src={userData.avatarLink || DemoUserAvatar}
                alt="User Avatar Icon"
                width={50}
                height={50}
                className="rounded-full"
            />
            <section className="flex flex-col justify-center">
                <p className="text-sm font-semibold">{userData.name}</p>
                <p className="text-sm text-gray-500">{userData.email}</p>
            </section>
        </article>
    );
}
