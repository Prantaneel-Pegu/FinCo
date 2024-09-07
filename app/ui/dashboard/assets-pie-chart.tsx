"use client";

import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../shadcn-components/ui/chart";
import { AssetsPieChartData } from "@/app/lib/types";

export const description = "Assets Distribution Pie Chart";

export default function AssetsPieChart({
    assetsPieChartData,
}: {
    assetsPieChartData: AssetsPieChartData;
}) {
    // Sorting assets by descending value so that pie-chart looks consistent

    assetsPieChartData = assetsPieChartData.sort(
        (asset1, asset2) => asset1.value - asset2.value,
    );

    const chartConfig = Object.fromEntries(
        assetsPieChartData.map((asset, index) => [
            asset.name,
            {
                label: asset.name,
                color: `hsl(var(--chart-${index + 1}))`, // FIX COLOR FOR 5+
            },
        ]),
    ) satisfies ChartConfig;

    const chartData = assetsPieChartData.map((asset, id) => {
        return {
            asset: asset.name,
            percentage: asset.percentageOfNetWorth,
            fill: `hsl(var(--chart-${id + 1}))`, // CORRECT FILLL FOR ASSETS MORE THAN FIVE
        };
    });

    // .recharts-legend-wrapper is modified in globals.css file
    return (
        <Card className="-mx-2 flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Assets Distribution</CardTitle>
                <CardDescription>% of net worth</CardDescription>
            </CardHeader>
            <CardContent className="my-6 mb-16 flex-1 p-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[290px] pb-0"
                >
                    <PieChart margin={{ top: 15 }}>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="percentage"
                            label
                            nameKey="asset"
                            className="mb-4"
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="asset" />}
                            className="-translate-y-2 flex-wrap gap-2 px-4 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground text-center leading-none">
                    Showing assets distribution for current portfolio
                </div>
            </CardFooter>
        </Card>
    );
}
