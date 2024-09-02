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

export const description = "Assets Distribution Pie Chart";

export default function AssetsPieChart({
    assetsTableData,
}: {
    assetsTableData: (string | number)[][];
}) {
    const chartConfig = {
        [assetsTableData[3][0]]: {
            label: assetsTableData[3][0],
            color: "hsl(var(--chart-1))",
        },
        [assetsTableData[1][0]]: {
            label: assetsTableData[1][0],
            color: "hsl(var(--chart-2))",
        },
        [assetsTableData[2][0]]: {
            label: assetsTableData[2][0],
            color: "hsl(var(--chart-3))",
        },
        [assetsTableData[0][0]]: {
            label: assetsTableData[0][0],
            color: "hsl(var(--chart-4))",
        },
        [assetsTableData[4][0]]: {
            label: assetsTableData[4][0],
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig;

    const chartData = [
        {
            asset: assetsTableData[3][0],
            percentage: assetsTableData[3][2],
            fill: "hsl(var(--chart-1))",
        },

        {
            asset: assetsTableData[1][0],
            percentage: assetsTableData[1][2],
            fill: "hsl(var(--chart-2))",
        },
        {
            asset: assetsTableData[2][0],
            percentage: assetsTableData[2][2],
            fill: "hsl(var(--chart-3))",
        },
        {
            asset: assetsTableData[0][0],
            percentage: assetsTableData[0][2],
            fill: "hsl(var(--chart-4))",
        },
        {
            asset: assetsTableData[4][0],
            percentage: assetsTableData[4][2],
            fill: "hsl(var(--chart-5))",
        },
    ];

    // .recharts-legend-wrapper is modified in globals.css file

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Assets Distribution</CardTitle>
                <CardDescription>% of net worth</CardDescription>
            </CardHeader>
            <CardContent className="my-6 mb-12 flex-1 p-0">
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
