import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
    path: `./.env.development.local`,
});

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL as string,
    },
    verbose: true,
    strict: true,
});
