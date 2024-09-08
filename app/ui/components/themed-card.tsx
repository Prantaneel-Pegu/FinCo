import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn-components/ui/card";

export default function ThemedCard({
    cardTitle,
    cardDescription,
    cardContent,
    cardFooter,
}: {
    cardTitle: string;
    cardDescription?: string;
    cardContent: Readonly<React.ReactNode>;
    cardFooter?: Readonly<React.ReactNode>;
}) {
    return (
        <Card className="max-w-sm rounded-3xl border-2 border-gray-300 shadow-lg">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                {cardDescription ? (
                    <CardDescription>{cardDescription}</CardDescription>
                ) : null}
            </CardHeader>
            <CardContent>{cardContent}</CardContent>
            {cardFooter ? <CardFooter>{cardFooter}</CardFooter> : null}
        </Card>
    );
}
