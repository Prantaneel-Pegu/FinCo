"use client";

import { CurrencyData, UpdateCurrencyData, UserData } from "@/app/lib/types";
import CurrencySelector from "../components/currency-selector";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../shadcn-components/ui/table";
import AssetsPieChart from "./assets-pie-chart";

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

    const assetsTableData = [
        [
            "Cash",
            localisedUserData.cashAmount,
            Math.round(
                (parseFloat(localisedUserData.cashAmount) * 100) /
                    parseFloat(localisedUserData.netWorth),
            ),
        ],
        [
            "Stocks",
            localisedUserData.stocksValue,
            Math.round(
                (parseFloat(localisedUserData.stocksValue) * 100) /
                    parseFloat(localisedUserData.netWorth),
            ),
        ],
        [
            "Bonds",
            localisedUserData.bondsValue,
            Math.round(
                (parseFloat(localisedUserData.bondsValue) * 100) /
                    parseFloat(localisedUserData.netWorth),
            ),
        ],
        [
            "Properties",
            localisedUserData.propertiesValue,
            Math.round(
                (parseFloat(localisedUserData.propertiesValue) * 100) /
                    parseFloat(localisedUserData.netWorth),
            ),
        ],
        [
            "Other Assets",
            localisedUserData.otherAssetsValue,
            Math.round(
                (parseFloat(localisedUserData.otherAssetsValue) * 100) /
                    parseFloat(localisedUserData.netWorth),
            ),
        ],
    ];

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
                    <Card className="max-w-sm rounded-3xl border-2 border-gray-300 shadow-lg">
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
                    <Card className="max-w-max rounded-3xl border-2 border-gray-300 shadow-lg">
                        <CardHeader className="pb-3">
                            <CardTitle>Your Assets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="-ml-3">
                                <TableHeader>
                                    <TableRow className="text-lg">
                                        <TableHead>Asset</TableHead>
                                        <TableHead>Value</TableHead>
                                        <TableHead>% of Net Worth</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assetsTableData.map((assetData, id) => (
                                        <TableRow
                                            key={id}
                                            className="text-base"
                                        >
                                            <TableCell className="font-medium">
                                                {assetData[0]}
                                            </TableCell>
                                            <TableCell>
                                                {cSymbol}
                                                {assetData[1]}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {assetData[2]}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <article className="mt-8">
                                <AssetsPieChart
                                    assetsTableData={assetsTableData}
                                />
                            </article>
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
