import Image from "next/image";
import LogoImage from "@/public/logo.svg";

type Props = {
    width?: number;
    height?: number;
    className?: string;
};

export default function Logo({ width, height, className }: Props) {
    return (
        <Image
            src={LogoImage}
            alt="FinCo Logo"
            width={width}
            height={height}
            className={className}
        />
    );
}
