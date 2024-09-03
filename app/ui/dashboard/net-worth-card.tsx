import ChangeWithTime from "../components/change-with-time";
import ThemedCard from "../components/themed-card";

export default function NetWorthCard({
    netWorth,
    percentChangeWithTime,
    didIncreaseWithTime,
}: {
    netWorth: string;
    percentChangeWithTime: string;
    didIncreaseWithTime: boolean;
}) {
    return (
        <ThemedCard
            cardTitle="Net Worth"
            cardContent={<p className="text-2xl font-semibold">{netWorth}</p>}
            cardFooter={
                <>
                    <ChangeWithTime
                        didIncreaseWithTime={didIncreaseWithTime}
                        percentChangeWithTime={percentChangeWithTime}
                    />
                </>
            }
        />
    );
}
