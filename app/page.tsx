import type { Metadata } from "next";
import { nestArray } from "@/lib/arrayHelpers";
import { getItemsfromDb } from "@/lib/prisma";
import { Board } from "./components/kanban/board/Board";

export default async function IndexPage() {
	const items = await getItemsfromDb();
	return (
		<div>
			<p>test user</p>
			<Board initialItems={nestArray(items)} />
		</div>
	);
}

export const metadata: Metadata = {
	title: "Kanban Board",
};
