"use client";

import { useContext, useRef, useState } from "react";
import { Turn as NavButton } from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import { UserDataContextType } from "../main/user-data-provider";
import { UserDataContext } from "./user-data-provider";
import {
    CircleDollarSign,
    FileMinus,
    LayoutDashboard,
    LogOut,
    Shield,
    UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function DemoNavigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navPanel = useRef<HTMLDivElement>(null);
    const { userData, updateUserData } =
        useContext<UserDataContextType>(UserDataContext);

    const pathname = usePathname();

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
                    className="nav-panel-hidden absolute left-0 z-30 flex h-screen w-screen flex-col bg-slate-200 pt-20 transition-all duration-500"
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
                    <div className="flex flex-col gap-2">
                        <Link
                            href={"/demo/dashboard"}
                            className={`rounded-full px-8 py-4 text-lg ${pathname === "/demo/dashboard" ? "active-nav-link" : ""}`}
                            onClick={navLinkClicked}
                        >
                            <p className="flex items-center gap-2">
                                <span>
                                    <LayoutDashboard />
                                </span>
                                <span>Dashboard</span>
                            </p>
                        </Link>
                        <Link
                            href={"/demo/"}
                            className={`rounded-full px-8 py-4 text-lg ${pathname === "/demo/" ? "active-nav-link" : ""}`}
                            onClick={navLinkClicked}
                        >
                            <p className="flex items-center gap-2">
                                <span>
                                    <Shield />
                                </span>
                                <span>Risk Mitigation</span>
                            </p>
                        </Link>
                        <Link
                            href={"/demo/"}
                            className={`rounded-full px-8 py-4 text-lg ${pathname === "/demo/" ? "active-nav-link" : ""}`}
                            onClick={navLinkClicked}
                        >
                            <p className="flex items-center gap-2">
                                <span>
                                    <CircleDollarSign />
                                </span>
                                <span>Interest Calculator</span>
                            </p>
                        </Link>
                        <Link
                            href={"/demo/account/settings"}
                            className={`rounded-full px-8 py-4 text-lg ${pathname === "/demo/account/settings" ? "active-nav-link" : ""}`}
                            onClick={navLinkClicked}
                        >
                            <p className="flex items-center gap-2">
                                <span>
                                    <UserRound />
                                </span>
                                <span>Account</span>
                            </p>
                        </Link>
                        <Link
                            href={"/demo/privacy-policy"}
                            className={`rounded-full px-8 py-4 text-lg ${pathname === "/demo/privacy-policy" ? "active-nav-link" : ""}`}
                            onClick={navLinkClicked}
                        >
                            <p className="flex items-center gap-2">
                                <span>
                                    <FileMinus />
                                </span>
                                <span>Privacy Policy</span>
                            </p>
                        </Link>
                        <Link
                            href={"/"}
                            className={`rounded-full px-8 py-4 text-lg ${pathname === "/" ? "active-nav-link" : ""}`}
                            onClick={navLinkClicked}
                        >
                            <p className="flex items-center gap-2">
                                <span>
                                    <LogOut />
                                </span>
                                <span>Signout</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </nav>

            <nav className="hidden flex-col justify-between gap-12 pl-6 pr-8 lg:flex">
                <div className="flex flex-col gap-6">
                    <Link
                        href={"/demo/dashboard"}
                        className={`rounded-full px-8 py-4 text-xl ${pathname === "/demo/dashboard" ? "active-nav-link" : ""}`}
                        onClick={navLinkClicked}
                    >
                        <p className="flex items-center gap-2">
                            <span>
                                <LayoutDashboard />
                            </span>
                            <span>Dashboard</span>
                        </p>
                    </Link>
                    <Link
                        href={"/demo/"}
                        className={`rounded-full px-8 py-4 text-xl ${pathname === "/demo/" ? "active-nav-link" : ""}`}
                        onClick={navLinkClicked}
                    >
                        <p className="flex items-center gap-2 text-xl">
                            <span>
                                <Shield />
                            </span>
                            <span>Risk Mitigation</span>
                        </p>
                    </Link>
                    <Link
                        href={"/demo/"}
                        className={`rounded-full px-8 py-4 text-xl ${pathname === "/demo/" ? "active-nav-link" : ""}`}
                        onClick={navLinkClicked}
                    >
                        <p className="flex items-center gap-2">
                            <span>
                                <CircleDollarSign />
                            </span>
                            <span>Interest Calculator</span>
                        </p>
                    </Link>
                </div>
                <div className="absolute bottom-16 left-0 ml-6 mr-8 flex flex-col gap-4">
                    <Link
                        href={"/demo/account/settings"}
                        className={`rounded-full px-8 py-4 text-xl ${pathname === "/demo/account/settings" ? "active-nav-link" : ""}`}
                        onClick={navLinkClicked}
                    >
                        <p className="flex items-center gap-2">
                            <span>
                                <UserRound />
                            </span>
                            <span>Account</span>
                        </p>
                    </Link>
                    <Link
                        href={"/demo/privacy-policy"}
                        className={`rounded-full px-8 py-4 text-xl ${pathname === "/demo/privacy-policy" ? "active-nav-link" : ""}`}
                        onClick={navLinkClicked}
                    >
                        <p className="flex items-center gap-2">
                            <span>
                                <FileMinus />
                            </span>
                            <span>Privacy Policy</span>
                        </p>
                    </Link>
                    <Link
                        href={"/"}
                        className={`rounded-full px-8 py-4 text-xl ${pathname === "/" ? "active-nav-link" : ""}`}
                        onClick={navLinkClicked}
                    >
                        <p className="flex items-center gap-2">
                            <span>
                                <LogOut />
                            </span>
                            <span>Signout</span>
                        </p>
                    </Link>
                </div>
            </nav>
        </>
    );
}
