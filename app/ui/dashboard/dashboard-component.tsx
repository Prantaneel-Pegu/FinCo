"use client";

import { CurrencyData, UpdateCurrencyData, UserData } from "@/app/lib/types";
import CurrencySelector from "../components/currency-selector";

import NetWorthCard from "./net-worth-card";
import BankBalanceCard from "./bank-balance-card";
import AssetsDistributionCard from "./assets-distribution-card";
import RiskAssessmentCard from "./risk-assessment-card";

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
                    <NetWorthCard
                        netWorth={cSymbol.concat(
                            " ",
                            localisedUserData.netWorth,
                        )}
                        didIncreaseWithTime={true}
                        percentChangeWithTime="13.2"
                    />
                </section>

                <section>
                    <BankBalanceCard
                        currencySymbol={cSymbol}
                        balance={localisedUserData.cashAmount}
                        didIncreaseWithTime={true}
                        percentChangeWithTime={"12.1"}
                    />
                </section>

                <section>
                    <AssetsDistributionCard
                        currencySymbol={cSymbol}
                        assetsTableData={assetsTableData}
                        didIncreaseWithTime={true}
                        percentChangeWithTime={"8.5"}
                    />
                </section>

                <section>
                    <RiskAssessmentCard />
                </section>
            </div>
        </main>
    );
}
