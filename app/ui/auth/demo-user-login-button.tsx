import { Button } from "../shadcn-components/ui/button";
import Link from "next/link";

export default function DemoUserLoginButton() {
    return (
        <Link href={"/demo/dashboard"}>
            <Button type="submit" className="bg-accent mx-auto block w-max">
                Log in as Demo User
            </Button>
        </Link>
    );
}
