import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { AssetsRiskBarChartData } from "@/app/lib/types";

export const description = "A bar chart representing per-asset risk";

export default function RiskAssessmentBarChart({
    assetsRiskBarChartData,
}: {
    assetsRiskBarChartData: AssetsRiskBarChartData;
}) {
    const chartData = assetsRiskBarChartData.map((asset) => {
        return {
            asset: asset.asset,
            "Risk points": asset.riskPoints,
        };
    });

    const chartConfig = Object.fromEntries(
        assetsRiskBarChartData.map((asset, index) => [
            asset.asset,
            {
                label: asset.asset,
                color: `hsl(var(--chart-${index + 1}))`, // FIX COLOR FOR 5+
            },
        ]),
    ) satisfies ChartConfig;

    return (
        <Card className="-mx-2">
            <CardHeader>
                <CardTitle>Risk Visualization</CardTitle>
                <CardDescription>based on risk points</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-[275px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                        barGap={2}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="asset"
                            tickLine={false}
                            tickMargin={40}
                            axisLine={false}
                            angle={270}
                            height={90}
                            interval={0}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="Risk points"
                            fill="hsl(var(--chart-1))"
                            radius={4}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
