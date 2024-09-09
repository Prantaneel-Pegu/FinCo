import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "../ui/demo/header";
import { Metadata } from "next";
import CurrencyProvider from "../ui/demo/currency-provider";
import UserDataProvider from "../ui/demo/user-data-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FinCo",
    description: "A Fully-Featured Personal Finance WebApp",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} text-textColor antialiased`}>
                <UserDataProvider>
                    <CurrencyProvider>
                        <div className="lg:hidden">
                            <Header />
                            {children}
                        </div>
                        <div className="hidden lg:block">
                            <div className="mr-auto w-[17.5%]">
                                <Header />
                            </div>
                            <div className="ml-auto w-[82.5%]">{children}</div>
                        </div>
                    </CurrencyProvider>
                </UserDataProvider>
            </body>
        </html>
    );
}
