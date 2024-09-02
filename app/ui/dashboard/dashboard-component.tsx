"use client";

import { CurrencyData, UpdateCurrencyData, UserData } from "@/app/lib/types";
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
    currencyData,
    updateCurrencyDataContainer,
}: {
    userData: UserData;
    currencyData: CurrencyData;
    updateCurrencyDataContainer: { updateCurrencyData: UpdateCurrencyData }; // Since functions cannot be passed to client components
}) {
    const updateCurrencyData = updateCurrencyDataContainer.updateCurrencyData;

    const cSymbol = currencyData.currencySybmol;

    const localisedUserData = Object.fromEntries(
        Object.entries(userData).map(([key, value]) => {
            if (typeof value === "number") {
                if (currencyData.currency !== "INR") {
                    if (key === "cashAmount") {
                        return [
                            key,
                            Intl.NumberFormat("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value.toFixed(2))),
                        ];
                    } else
                        return [
                            key,
                            Intl.NumberFormat("en-US", {
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value.toFixed(2))),
                        ];
                } else {
                    if (key === "cashAmount") {
                        return [
                            key,
                            Intl.NumberFormat("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value.toFixed(2))),
                        ];
                    } else
                        return [
                            key,
                            Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value.toFixed(2))),
                        ];
                }
            } else return [key, value];
        }),
    );

    // console.log(cSymbol, cRate, userData, localisedUserData);

    return (
        <main className="mb-80 px-5">
            <section className="mb-10">
                <h1 className="mt-8 text-2xl font-semibold">
                    Welcome back, {localisedUserData.userName}!
                </h1>
                <p className="text-gray-500">Let&#39;s manage your finances</p>
            </section>

            <div className="flex flex-col gap-8">
                <section>
                    <CurrencySelector
                        currencyData={currencyData}
                        updateCurrencyDataContainer={{
                            updateCurrencyData: updateCurrencyData,
                        }}
                    />
                </section>

                <section>
                    <Card className="rounded-3xl border-2 border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle>Bank Balance</CardTitle>{" "}
                        </CardHeader>
                        <CardContent className="break-words">
                            <p className="text-2xl font-semibold">
                                {cSymbol}
                                {localisedUserData.cashAmount.split(".")[0]}
                                <span className="text-gray-400">
                                    {"."}
                                    {localisedUserData.cashAmount.split(".")[1]}
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
                            <CardTitle>Your Assets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <section className="break-words">
                                <ul className="flex flex-col gap-4 text-lg">
                                    <li>
                                        <span className="font-medium">
                                            Cash: {cSymbol}
                                            {localisedUserData.cashAmount}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Stocks: {cSymbol}
                                            {localisedUserData.stocksValue}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Bonds: {cSymbol}
                                            {localisedUserData.bondsValue}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Properties: {cSymbol}
                                            {localisedUserData.propertiesValue}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Other Assets: {cSymbol}
                                            {localisedUserData.otherAssetsValue}
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

                <section></section>
            </div>
        </main>
    );
}
