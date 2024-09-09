"use client";

import { useContext, useRef, useState } from "react";
import { Turn as NavButton } from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import { UserDataContextType } from "../main/user-data-provider";
import { UserDataContext } from "./user-data-provider";

export default function DemoNavigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navPanel = useRef<HTMLDivElement>(null);
    const { userData, updateUserData } =
        useContext<UserDataContextType>(UserDataContext);

    function toggleNav(navToggled: boolean) {
        if (navToggled) {
            navPanel.current?.classList.remove("nav-panel-hidden");
        } else {
            navPanel.current?.classList.add("nav-panel-hidden");
        }
    }

    function navLinkClicked() {
        navPanel.current?.classList.add("nav-panel-hidden");
        setIsNavOpen(false);
    }

    return (
        <>
            <nav className="relative lg:hidden">
                <div className="absolute left-1 top-2 z-40">
                    <NavButton
                        size={28}
                        onToggle={toggleNav}
                        toggled={isNavOpen}
                        toggle={setIsNavOpen}
                    />
                </div>
                <div
                    ref={navPanel}
                    className="nav-panel-hidden absolute left-0 z-30 flex h-screen w-screen flex-col gap-12 bg-slate-200 pt-20 transition-all duration-500"
                >
                    <section className="border-b-2 border-gray-300 pl-10">
                        <Image
                            src={"/demoUserAvatar.jpg"}
                            alt="User Avatar"
                            width={56}
                            height={56}
                            className="mb-6 rounded-full"
                        />
                        <p className="mb-8 text-2xl">{userData.name}</p>
                    </section>
                    <Link
                        href={"/demo/dashboard"}
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Dashboard
                    </Link>
                    <p
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Invoices
                    </p>
                    <p
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Account
                    </p>
                    <Link
                        href={"/"}
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Sign Out
                    </Link>
                </div>
            </nav>

            <nav className="mx-16 hidden flex-col gap-12 lg:flex">
                <p className="text-2xl">Sign up</p>
                <p className="text-2xl">Sign In</p>
                <p className="text-2xl">About</p>
            </nav>
        </>
    );
}
