"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../shadcn-components/ui/chart";
import { localiseCurrency } from "@/app/lib/utils";

export const description = "A line chart with dots";

export default function PortfolioValuationChart({
    cSymbol,
    netPortfolioWorth,
    portfolioInterestRate, // in decimal form
}: {
    cSymbol: string;
    netPortfolioWorth: number;
    portfolioInterestRate: number;
}) {
    const currentYear = new Date().getFullYear();

    const nextFiveYears: number[] = [currentYear];
    for (let i = 0; i < 4; i++) {
        nextFiveYears.push(currentYear + i + 1);
    }

    let compoundedPortfolioWorth = netPortfolioWorth;

    const chartData = nextFiveYears.map((year, index) => {
        if (index) {
            compoundedPortfolioWorth =
                compoundedPortfolioWorth +
                compoundedPortfolioWorth * portfolioInterestRate;
        }

        return {
            year: year,
            "Portfolio Valuation": compoundedPortfolioWorth,
        };
    });

    const chartConfig = {
        year: {
            label: "year",
            color: "hsl(var(--chart-1))",
        },
        "Portfolio Valuation": {
            label: "Portfolio Valuation",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Annual Portfolio Valuation</CardTitle>
                <CardDescription>
                    Taking current interest rate as constant compound interest
                    rate
                </CardDescription>
            </CardHeader>
            <CardContent className="my-2">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 3,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            interval={0}
                            padding={{ left: 2, right: 2 }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    formatter={(value) => (
                                        <div className="flex items-center gap-6">
                                            <p>Portfolio Valuation</p>
                                            <p className="font-semibold">
                                                {cSymbol +
                                                    (cSymbol !== "₹"
                                                        ? localiseCurrency(
                                                              value.toString(),
                                                              "other",
                                                              true,
                                                          )
                                                        : localiseCurrency(
                                                              value.toString(),
                                                              "inr",
                                                              true,
                                                          ))}
                                            </p>
                                        </div>
                                    )}
                                />
                            }
                        />
                        <Line
                            dataKey="Portfolio Valuation"
                            type="natural"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            dot={{
                                fill: "hsl(var(--chart-2))",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
