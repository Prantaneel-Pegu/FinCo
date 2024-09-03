import ChangeWithTime from "../components/change-with-time";
import ThemedCard from "../components/themed-card";

export default function BankBalanceCard({
    currencySymbol,
    balance,
    percentChangeWithTime,
    didIncreaseWithTime,
}: {
    currencySymbol: string;
    balance: string;
    percentChangeWithTime: string;
    didIncreaseWithTime: boolean;
}) {
    return (
        <ThemedCard
            cardTitle="Bank Balance"
            cardContent={
                <p className="text-2xl font-semibold">
                    {currencySymbol}
                    {balance.split(".")[0]}
                    <span className="text-gray-400">
                        {"."}
                        {balance.split(".")[1]}
                    </span>
                </p>
            }
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
