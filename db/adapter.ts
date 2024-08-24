import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sessions, users } from "./schema";

export const db = drizzle(sql);

const userTable = users;
const sessionsTable = sessions;

export const adapter = new DrizzlePostgreSQLAdapter(
    db,
    sessionsTable,
    userTable,
);
