import { Button } from "../shadcn-components/ui/button";
import Link from "next/link";

type Props = {
    className?: string;
};

export default function DemoUserLoginButton({ className }: Props) {
    return (
        <Link href={"/demo/dashboard"}>
            <Button
                type="submit"
                className={`mx-auto block w-max bg-accent ${className}`}
            >
                Log in as Demo User
            </Button>
        </Link>
    );
}
