"use client";

import { UserData } from "@/app/lib/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";
import CurrencySelector from "../components/currency-selector";

export default function DashboardComponent({
    userData,
}: {
    userData: UserData;
}) {
    return (
        <main className="mb-80 px-5">
            <section className="mb-10">
                <h1 className="mt-8 text-2xl font-semibold">
                    Welcome back, {userData.userName}!
                </h1>
                <p className="text-gray-500">Let&#39;s manage your finances</p>
            </section>

            <div className="flex flex-col gap-8">
                <section>
                    <CurrencySelector />
                </section>

                <section>
                    <Card className="rounded-3xl border-2 border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle>Bank Balance</CardTitle>{" "}
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {userData.cashAmount.split(".")[0]}
                                <span className="text-gray-400">
                                    {"."}
                                    {userData.cashAmount.split(".")[1]}
                                </span>
                            </p>
                        </CardContent>
                        <CardFooter>
                            <div className="mr-2 rounded-2xl bg-success-light px-2 py-1">
                                <p className="text-sm">
                                    <span className="text-success-dark">+</span>{" "}
                                    12.1%
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400"> vs last month</p>
                            </div>
                        </CardFooter>
                    </Card>
                </section>

                <section>
                    <Card className="rounded-3xl border-2 border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle>Your Assets</CardTitle>{" "}
                        </CardHeader>
                        <CardContent>
                            <section>
                                <ul className="flex flex-col gap-4 text-lg">
                                    <li>
                                        <span className="font-medium">
                                            Cash:{" "}
                                            {userData.cashAmount.split(".")[0]}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Stocks: {userData.stocksValue}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Bonds: {userData.bondsValue}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Properties:{" "}
                                            {userData.propertiesValue}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Other Assets:{" "}
                                            {userData.otherAssetsValue}
                                        </span>
                                    </li>
                                </ul>
                            </section>
                        </CardContent>
                        <CardFooter>
                            <div className="mr-3 text-nowrap rounded-2xl bg-success-light px-2 py-1">
                                <p className="text-sm">
                                    <span className="text-success-dark">-</span>{" "}
                                    8.5%
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400">
                                    decrease in total asset risk
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </section>
            </div>
        </main>
    );
}
