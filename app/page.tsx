import type { Metadata } from "next";
import { getItemsfromDb, createTestItemInDb } from "@/lib/prisma";
import { Board } from "./components/kanban/board/Board";
import { TaskItem } from "@/app/components/kanban/types";

export default async function IndexPage() {
	const items: TaskItem[] = await getItemsfromDb();

	//items.length === 0 && createTestItemInDb();
	return (
		<div>
			<header>fsdf</header>
			<Board initialItems={items} />
		</div>
	);
}

export const metadata: Metadata = {
	title: "Kanban Board",
};
