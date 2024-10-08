"use client";

import {
    AssetsInterestData,
    AssetsPieChartData,
    AssetsRiskBarChartData,
    AssetsRiskData,
    AssetsTableData,
    CurrencyData,
    LocalisedAssetsData,
    LocalisedUserData,
    UpdateCurrencyData,
    UserData,
} from "@/app/lib/types";
import CurrencySelector from "../components/currency-selector";
import NetWorthCard from "./net-worth-card";
import BankBalanceCard from "./bank-balance-card";
import AssetsDistributionCard from "./assets-distribution-card";
import RiskAssessmentCard from "./risk-assessment-card";
import PortfolioInterestCard from "./portfolio-interest-card";
import DashboardUserCard from "./user-card";
import NotificationCard from "./notification-card";

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

    const localisedUserData: LocalisedUserData = Object.fromEntries(
        Object.entries(userData).map(([key, value]) => {
            if (key === "netWorth" && typeof value === "number") {
                if (currencyData.currency !== "INR") {
                    return [
                        key,
                        Intl.NumberFormat("en-US", {
                            maximumFractionDigits: 2,
                        }).format(parseFloat(value.toFixed(2))),
                    ];
                } else {
                    return [
                        key,
                        Intl.NumberFormat("en-IN", {
                            maximumFractionDigits: 2,
                        }).format(parseFloat(value.toFixed(2))),
                    ];
                }
            }

            if (Array.isArray(value)) {
                const localisedAssetsData: LocalisedAssetsData = [];

                for (let i = 0; i < value.length; i++) {
                    if (currencyData.currency !== "INR") {
                        localisedAssetsData.push({
                            ...value[i],
                            value: Intl.NumberFormat("en-US", {
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value[i].value.toFixed(2))),
                            interest: Intl.NumberFormat("en-US", {
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value[i].interest.toFixed(2))),
                        });
                    } else {
                        localisedAssetsData.push({
                            ...value[i],
                            value: Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value[i].value.toFixed(2))),
                            interest: Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 2,
                            }).format(parseFloat(value[i].interest.toFixed(2))),
                        });
                    }
                }
                return [key, localisedAssetsData];
            } else return [key, value];
        }),
    );

    const assetsTableData: AssetsTableData = localisedUserData.assets.map(
        (asset) => {
            return {
                name: asset.name,
                value: asset.value,
                percentageOfNetWorth: Math.round(
                    (parseFloat(asset.value.replaceAll(",", "")) * 100) /
                        userData.netWorth,
                ),
            };
        },
    );

    const assetsPieChartData: AssetsPieChartData = userData.assets.map(
        (asset) => {
            return {
                name: asset.name,
                value: asset.value,
                percentageOfNetWorth: Math.round(
                    (asset.value * 100) / userData.netWorth,
                ),
            };
        },
    );

    const assetsRiskData: AssetsRiskData = userData.assets.map((asset) => {
        return {
            name: asset.name,
            riskValue: asset.riskValue,
            percentageOfNetWorth: Math.round(
                (asset.value * 100) / userData.netWorth,
            ),
            riskContribution: Math.round(
                ((asset.value * 100) / userData.netWorth) * asset.riskValue,
            ), // percentageOfNetWorth * riskValue
        };
    });

    const assetsRiskBarChartData: AssetsRiskBarChartData = userData.assets.map(
        (asset) => {
            return {
                asset: asset.name,
                riskPoints: Math.round(
                    ((asset.value * 100) / userData.netWorth) * asset.riskValue,
                ), // percentageOfNetWorth * riskValue
            };
        },
    );

    const assetsInterestData: AssetsInterestData = userData.assets.map(
        (asset) => {
            return {
                name: asset.name,
                value: asset.value,
                interest: localisedUserData.assets.find(
                    (targetAsset) => targetAsset.name === asset.name,
                )?.interest!,
                interestRate: asset.interestRate,
                percentageOfNetWorth: Math.round(
                    (asset.value * 100) / userData.netWorth,
                ),
            };
        },
    );

    console.log(userData, assetsInterestData);

    return (
        <main className="mb-80 px-5 lg:px-12">
            <div className="mb-12 mr-8 justify-between lg:flex">
                <section className="mb-10 mt-8">
                    <h1 className="text-2xl font-semibold">
                        Welcome back, {localisedUserData.userName}!
                    </h1>
                    <p className="text-gray-500">
                        Let&#39;s manage your finances
                    </p>
                </section>

                <section className="lg:mt-8">
                    <section className="mb-12 flex flex-col-reverse items-center gap-2 lg:flex-row">
                        <NotificationCard />
                        <DashboardUserCard userData={userData} />
                    </section>
                    <CurrencySelector
                        currencyData={currencyData}
                        updateCurrencyDataContainer={{
                            updateCurrencyData: updateCurrencyData,
                        }}
                    />
                </section>
            </div>

            <div className="lg:dashboard-grid-areas-lg flex auto-cols-fr flex-col gap-8 lg:grid">
                <section className="[grid-area:netWorth]">
                    <NetWorthCard
                        netWorth={cSymbol.concat(
                            " ",
                            localisedUserData.netWorth,
                        )}
                    />
                </section>

                {localisedUserData.assets.find(
                    (asset) => asset.name.toLowerCase() === "cash",
                )?.value !== undefined ? (
                    <section className="[grid-area:bankBal]">
                        <BankBalanceCard
                            balance={cSymbol.concat(
                                " ",
                                localisedUserData.assets.find(
                                    (asset) =>
                                        asset.name.toLowerCase() === "cash",
                                )!.value,
                            )}
                        />
                    </section>
                ) : null}

                <section className="[grid-area:assetDist]">
                    <AssetsDistributionCard
                        currencySymbol={cSymbol}
                        assetsTableData={assetsTableData}
                        assetsPieChartData={assetsPieChartData}
                    />
                </section>

                <section className="[grid-area:pYield]">
                    <PortfolioInterestCard
                        currencySymbol={cSymbol}
                        assetsInterestData={assetsInterestData}
                        netWorth={userData.netWorth}
                    />
                </section>

                <section className="[grid-area:riskCard]">
                    <RiskAssessmentCard
                        assetsRiskData={assetsRiskData}
                        assetsRiskBarChartData={assetsRiskBarChartData}
                    />
                </section>
            </div>
        </main>
    );
}
