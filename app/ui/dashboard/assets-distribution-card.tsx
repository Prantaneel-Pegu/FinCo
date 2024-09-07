import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../shadcn-components/ui/table";
import ThemedCard from "../components/themed-card";
import AssetsPieChart from "./assets-pie-chart";
import { AssetsPieChartData, AssetsTableData } from "@/app/lib/types";

export default function AssetsDistributionCard({
    currencySymbol,
    assetsTableData,
    assetsPieChartData,
}: {
    currencySymbol: string;
    assetsTableData: AssetsTableData;
    assetsPieChartData: AssetsPieChartData;
}) {
    return (
        <ThemedCard
            cardTitle="Your Assets"
            cardContent={
                <>
                    <Table className="-ml-3">
                        <TableHeader>
                            <TableRow className="text-lg">
                                <TableHead>Asset</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>% of Net Worth</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assetsTableData.map((asset, id) => (
                                <TableRow key={id} className="text-base">
                                    <TableCell className="font-medium">
                                        {asset.name}
                                    </TableCell>
                                    <TableCell>
                                        {currencySymbol}
                                        {asset.value}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {asset.percentageOfNetWorth}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <article className="mt-8">
                        <AssetsPieChart
                            assetsPieChartData={assetsPieChartData}
                        />
                    </article>
                </>
            }
        />
    );
}
