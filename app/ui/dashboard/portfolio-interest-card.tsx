import { AssetsInterestData } from "@/app/lib/types";
import ThemedCard from "../components/themed-card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../shadcn-components/ui/table";
import PortfolioValuationChart from "./portfolio-valuation-chart";
import { localiseCurrency } from "@/app/lib/utils";

export default function PortfolioInterestCard({
    assetsInterestData,
    currencySymbol,
    netWorth,
}: {
    assetsInterestData: AssetsInterestData;
    currencySymbol: string;
    netWorth: number;
}) {
    const initialPortfolioInterest = 0;
    // this is in percent form, not decimal form
    const totalPortfolioInterestRate = parseFloat(
        (
            (assetsInterestData.reduce(
                (accumulatedInterest, currentAsset) =>
                    accumulatedInterest +
                    currentAsset.interestRate * currentAsset.value,
                initialPortfolioInterest,
            ) /
                netWorth) *
            100
        ).toFixed(2),
    );
    const totalPortfolioInterest = assetsInterestData
        .reduce(
            (accumulatedInterest, currentAsset) =>
                accumulatedInterest +
                currentAsset.interestRate * currentAsset.value,
            initialPortfolioInterest,
        )
        .toFixed(2);

    let assetsInterestText = "Low";
    let assetsInterestColor = "text-red-700";

    if (totalPortfolioInterestRate > 12) {
        assetsInterestText = "Excellent";
        assetsInterestColor = "text-green-400";
    } else if (totalPortfolioInterestRate > 8) {
        assetsInterestText = "High";
        assetsInterestColor = "text-emerald-400";
    } else if (totalPortfolioInterestRate > 5) {
        assetsInterestText = "Medium";
        assetsInterestColor = "text-amber-500";
    }

    return (
        <ThemedCard
            cardTitle="Annual Portfolio Yield"
            cardDescription="Detailed data about your profits"
            cardContent={
                <article>
                    <Table className="-ml-3">
                        <TableHeader>
                            <TableRow className="text-lg">
                                {[
                                    "Asset",
                                    "Annual Interest Rate",
                                    "Interest p.a.",
                                ].map((heading, id) => (
                                    <TableHead key={id}>{heading}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assetsInterestData.map((asset, id) => (
                                <TableRow key={id} className="text-base">
                                    <TableCell className="font-medium">
                                        {asset.name}
                                    </TableCell>
                                    <TableCell>
                                        {asset.interestRate * 100}%
                                    </TableCell>
                                    <TableCell>
                                        {currencySymbol}
                                        {asset.interest}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="mb-4 mt-8">
                        Total Portfolio Interest Rate:{" "}
                        {totalPortfolioInterestRate}%{" "}
                        <span className={assetsInterestColor}>
                            ({assetsInterestText})
                        </span>
                    </p>
                    <p className="mb-8">
                        Annual Portfolio Interest: {currencySymbol}
                        {currencySymbol !== "₹"
                            ? localiseCurrency(
                                  totalPortfolioInterest,
                                  "other",
                                  true,
                              )
                            : localiseCurrency(
                                  totalPortfolioInterest,
                                  "inr",
                                  true,
                              )}
                    </p>
                    <section className="-mx-2">
                        <PortfolioValuationChart
                            cSymbol={currencySymbol}
                            netPortfolioWorth={netWorth}
                            portfolioInterestRate={
                                totalPortfolioInterestRate / 100
                            }
                        />
                    </section>
                </article>
            }
        />
    );
}
