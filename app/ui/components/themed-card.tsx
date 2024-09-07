import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";

export default function ThemedCard({
    cardTitle,
    cardContent,
    cardFooter,
}: {
    cardTitle: string;
    cardContent: Readonly<React.ReactNode>;
    cardFooter?: Readonly<React.ReactNode>;
}) {
    return (
        <Card className="max-w-sm rounded-3xl border-2 border-gray-300 shadow-lg">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>{cardContent}</CardContent>
            {cardFooter ? <CardFooter>{cardFooter}</CardFooter> : null}
        </Card>
    );
}
