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
import ChangeWithTime from "../components/change-with-time";

export default function AssetsDistributionCard({
    currencySymbol,
    assetsTableData,
    didIncreaseWithTime,
    percentChangeWithTime,
}: {
    currencySymbol: string;
    assetsTableData: (string | number)[][];
    didIncreaseWithTime: boolean;
    percentChangeWithTime: string;
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
                            {assetsTableData.map((assetData, id) => (
                                <TableRow key={id} className="text-base">
                                    <TableCell className="font-medium">
                                        {assetData[0]}
                                    </TableCell>
                                    <TableCell>
                                        {currencySymbol}
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
                        <AssetsPieChart assetsTableData={assetsTableData} />
                    </article>
                </>
            }
            cardFooter={
                <ChangeWithTime
                    didIncreaseWithTime={didIncreaseWithTime}
                    percentChangeWithTime={percentChangeWithTime}
                />
            }
        />
    );
}
