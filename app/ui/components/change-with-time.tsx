export default function ChangeWithTime({
    didIncreaseWithTime,
    percentChangeWithTime,
    comparisionText = "vs last month",
}: {
    didIncreaseWithTime: boolean;
    percentChangeWithTime: string;
    comparisionText?: string;
}) {
    return (
        <>
            <div className="mr-2 rounded-2xl bg-success-light px-2 py-1">
                <p className="text-sm">
                    <span className="text-success-dark">
                        {didIncreaseWithTime ? "+" : "-"}
                    </span>{" "}
                    {percentChangeWithTime}%
                </p>
            </div>
            <div>
                <p className="text-gray-400">{" ".concat(comparisionText)}</p>
            </div>
        </>
    );
}
