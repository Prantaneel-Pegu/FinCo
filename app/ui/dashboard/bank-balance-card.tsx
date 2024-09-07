import ChangeWithTime from "../components/change-with-time";
import ThemedCard from "../components/themed-card";

export default function BankBalanceCard({ balance }: { balance: string }) {
    if (!balance.split(".")[1]) {
        balance.replace(".", "");
        balance += ".00";
    } else if (balance.split(".")[1].length === 1) {
        balance += "0";
    }

    return (
        <ThemedCard
            cardTitle="Bank Balance"
            cardContent={
                <p className="text-2xl font-semibold">
                    {balance.split(".")[0]}
                    <span className="text-gray-400">
                        {"."}
                        {balance.split(".")[1]}
                    </span>
                </p>
            }
        />
    );
}
