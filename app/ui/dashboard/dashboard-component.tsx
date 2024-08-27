"use client";

import { UserData } from "@/app/lib/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";

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
                    <Card className="rounded-3xl border-2 border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle>Total Balance</CardTitle>{" "}
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {userData.balance.split(".")[0]}
                                <span className="text-gray-400">
                                    {"."}
                                    {userData.balance.split(".")[1]}
                                </span>
                            </p>
                        </CardContent>
                        <CardFooter>
                            <div className="bg-success-light mr-2 rounded-2xl px-2 py-1">
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
                                            Cash: $8000
                                        </span>{" "}
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Stocks: $37650
                                        </span>{" "}
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Bonds: $200
                                        </span>{" "}
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Properties: Not Given
                                        </span>{" "}
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Others: $0
                                        </span>{" "}
                                    </li>
                                </ul>
                            </section>
                        </CardContent>
                        <CardFooter>
                            <div className="bg-success-light mr-3 text-nowrap rounded-2xl px-2 py-1">
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
