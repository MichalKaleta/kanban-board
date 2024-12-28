import type { Metadata } from "next";
import { nestArray } from "@/lib/arrayHelpers";
import { getItems } from "@/lib/prisma";
import { Board } from "./components/kanban/board/Board";

export default async function IndexPage() {
	const items = await getItems();
	return (
		<>
			<p>test user</p>
			<Board initialItems={nestArray(items)} />
		</>
	);
}

export const metadata: Metadata = {
	title: "Kanban Board",
};
