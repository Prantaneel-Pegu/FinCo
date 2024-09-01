import "@/app/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../ui/main/header";
import CurrencyProvider from "../ui/main/currency-provider";
import UserDataProvider from "../ui/main/user-data-provider";

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
                        <Header />
                        {children}
                    </CurrencyProvider>
                </UserDataProvider>
            </body>
        </html>
    );
}
