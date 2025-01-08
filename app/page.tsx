import type { Metadata } from "next";
import { nestArray } from "@/lib/arrayHelpers";
import { getItemsfromDb } from "@/lib/prisma";
import { Board } from "./components/kanban/board/Board";
import { addTestData } from "../prisma/testData";
import { reorderItemsInDb } from "@/lib/prisma";
import { selectUsers } from "@/app/db/index";

export default async function IndexPage() {
	//addTestData();
	//const items = await getItemsfromDb();
	const items = await selectUsers();
	console.log(items);
	return (
		<div>
			<p>test user</p>
			<Board initialItems={items} />
		</div>
	);
}

export const metadata: Metadata = {
	title: "Kanban Board",
};
