import type { Metadata } from "next";
import { nestArray } from "@/lib/arrayHelpers";
import prisma from "../lib/prisma";
import { Board } from "./components/kanban/board/Board";

export default async function IndexPage() {
	const items = await prisma.items.findMany({
		where: { userId: "1" },
	});

	return (
		<>
			<p>test user</p>
			<Board items={nestArray(items)} />
		</>
	);
}

export const metadata: Metadata = {
	title: "Kanban Board",
};
