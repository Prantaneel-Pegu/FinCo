import ChangeWithTime from "../components/change-with-time";
import ThemedCard from "../components/themed-card";

export default function NetWorthCard({ netWorth }: { netWorth: string }) {
    if (!netWorth.split(".")[1]) {
        netWorth.replace(".", "");
        netWorth += ".00";
    } else if (netWorth.split(".")[1].length === 1) {
        netWorth += "0";
    }

    return (
        <ThemedCard
            cardTitle="Net Worth"
            cardContent={
                <p className="text-2xl font-semibold">
                    {netWorth.split(".")[0]}
                    <span className="text-gray-400">
                        {"."}
                        {netWorth.split(".")[1]}
                    </span>
                </p>
            }
        />
    );
}
