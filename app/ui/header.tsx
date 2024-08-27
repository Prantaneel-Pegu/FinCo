import Link from "next/link";
import Navigation from "./navigation";
import Logo from "./components/logo";

export default function Header() {
    return (
        <header className="sticky left-0 top-0 z-20 border-b-2 border-gray-300 backdrop-blur-md">
            <Navigation />

            <p className="py-3 pr-1.5 text-center text-3xl font-semibold">
                <Logo width={36} height={36} className="mr-2 inline-block" />
                <Link href={"/"} className="align-middle">
                    FinCo
                </Link>
            </p>
        </header>
    );
}
