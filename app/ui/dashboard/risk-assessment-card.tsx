import { AssetsRiskBarChartData, AssetsRiskData } from "@/app/lib/types";
import ThemedCard from "../components/themed-card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../shadcn-components/ui/table";
import RiskAssessmentBarChart from "./risk-assessment-bar-chart";

export default function RiskAssessment({
    assetsRiskData,
    assetsRiskBarChartData,
}: {
    assetsRiskData: AssetsRiskData;
    assetsRiskBarChartData: AssetsRiskBarChartData;
}) {
    const initialTotalRisk = 0;
    const finalTotalRisk = parseFloat(
        assetsRiskData
            .reduce(
                (accumulatedRisk, currentAsset) =>
                    accumulatedRisk + currentAsset.riskContribution,
                initialTotalRisk,
            )
            .toFixed(2),
    );

    let riskText = "Low";
    let riskTextColor = "text-green-300";

    if (finalTotalRisk > 25) {
        riskText = "Medium";
        riskTextColor = "text-amber-500";
    } else if (finalTotalRisk > 45) {
        riskText = "High";
        riskTextColor = "text-red-500";
    } else {
        riskText = "Dangerously High";
        riskTextColor = "text-red-700";
    }

    return (
        <ThemedCard
            cardTitle="Risk Assessment"
            cardContent={
                <article>
                    <Table className="-ml-3">
                        <TableHeader>
                            <TableRow className="text-lg">
                                {[
                                    "Asset",
                                    "Risk Contribution",
                                    "% of Net Worth",
                                ].map((heading, id) => (
                                    <TableHead key={id}>{heading}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assetsRiskData.map((asset, id) => (
                                <TableRow key={id} className="text-base">
                                    <TableCell className="font-medium">
                                        {asset.name}
                                    </TableCell>
                                    <TableCell>
                                        {asset.riskContribution} risk points
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {asset.percentageOfNetWorth}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="mb-8 mt-8">
                        Total Risk Score: {finalTotalRisk}{" "}
                        <span className={riskTextColor}>({riskText})</span>
                    </p>

                    <RiskAssessmentBarChart
                        assetsRiskBarChartData={assetsRiskBarChartData}
                    />
                </article>
            }
        />
    );
}
