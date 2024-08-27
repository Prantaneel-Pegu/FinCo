import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                textColor: "#091a10",
                bgColor: "#FFFFFF",
                primary: "#37abd6",
                secondary: "#9389e7",
                accent: "#9464df",
                "success-dark": "#297B32",
                "success-light": "#E5FAE6",
                "danger-dark": "#E83838",
                "danger-light": "#FFEBEB",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/forms")({
            strategy: "class", // only generate classes
        }),
    ],
} satisfies Config;

export default config;
