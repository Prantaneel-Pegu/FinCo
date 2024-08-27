import { adapter } from "@/db/adapter";
import { UserSelect } from "@/db/schema";
import { Lucia, TimeSpan } from "lucia";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: true,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    sessionExpiresIn: new TimeSpan(1, "h"),
    getUserAttributes: (attributes) => {
        // attributes has the type of DatabaseUserAttributes
        return attributes;
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

type DatabaseUserAttributes = UserSelect;
