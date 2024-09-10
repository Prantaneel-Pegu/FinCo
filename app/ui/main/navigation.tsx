"use client";

import { Turn as NavButton } from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Navigation() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navPanel = useRef<HTMLDivElement>(null);

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

    // import useRouter and style active links

    return (
        <>
            <nav className="relative md:hidden">
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
                            className="mb-8 rounded-full"
                        />
                    </section>
                    <Link
                        href={"/"}
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Home
                    </Link>
                    <p
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Sign up
                    </p>
                    <p
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        Sign In
                    </p>
                    <p
                        className="ml-10 mr-12 text-2xl"
                        onClick={navLinkClicked}
                    >
                        About
                    </p>
                </div>
            </nav>

            <nav className="relative ml-auto mr-16 hidden w-max flex-row gap-4 md:flex">
                <p className="text-2xl">Sign up</p>
                <p className="text-2xl">Sign In</p>
                <p className="text-2xl">About</p>
            </nav>
        </>
    );
}
