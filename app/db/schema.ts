import { drizzle } from "drizzle-orm/vercel-postgres";

import {
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
	uniqueIndex,
} from "drizzle-orm/pg-core";

// Use this object to send drizzle queries to your DB

export const usersTable = pgTable("User", {
	id: varchar({ length: 255 }).primaryKey(),

	email: varchar({ length: 255 }).unique(),
});

/* export const itemsTable = pgTable("items", {
	id: varchar({ length: 255 }).primaryKey(),
	value: varchar({ length: 255 }),
	parent: varchar({ length: 255 }),
	parentId: varchar({ length: 255 }),
	column: integer(),
	userId: t.varchar({ length: 255 }).references(() => usersTable.id),
	children: integer(),
	depth: integer(),
	index: integer(),
	isLast: boolean(),
}); */
