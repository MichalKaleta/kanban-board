import { drizzle } from "drizzle-orm/vercel-postgres";
import { usersTable } from "./schema";
import { sql } from "@vercel/postgres";

export const db = drizzle(sql);

export const selectUsers = () => {
	db.select().from(usersTable);
};
