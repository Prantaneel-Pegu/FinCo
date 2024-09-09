"use client";

import Link from "next/link";
import Navigation from "./navigation";
import Logo from "../components/logo";

export default function DemoHeader() {
    return (
        <>
            <header className="sticky left-0 top-0 z-20 border-b-2 border-gray-300 backdrop-blur-md lg:hidden">
                <Navigation />

                <p className="py-3 pr-1.5 text-center text-3xl font-semibold">
                    <Logo
                        width={36}
                        height={36}
                        className="mr-2 inline-block"
                    />
                    <Link href={"/"} className="align-middle">
                        FinCo
                    </Link>
                </p>
            </header>
            <header className="fixed left-0 top-0 hidden h-screen w-[17.5%] border-b-2 border-gray-300 bg-violet-100 backdrop-blur-md lg:block">
                <div className="flex flex-col gap-16">
                    <p className="ml-8 mt-6 pr-1.5 text-4xl font-semibold">
                        <Logo
                            width={50}
                            height={50}
                            className="mr-2 inline-block"
                        />
                        <Link href={"/"} className="align-middle">
                            FinCo
                        </Link>
                    </p>

                    <Navigation />
                </div>
            </header>
        </>
    );
}
