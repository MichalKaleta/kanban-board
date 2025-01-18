import type { Metadata } from "next";
import { getItemsfromDb, createTestItemInDb } from "@/lib/prisma";
import { Board } from "./components/kanban/board/Board";
import { TaskItem } from "./components/kanban/types";

export default async function IndexPage() {
	const initialItems = await getItemsfromDb();
	return (
		<div>
			ss{" "}
			{initialItems && (
				<div>
					<header>fsdf</header>
					<Board initialItems={initialItems} />
				</div>
			)}
		</div>
	);
}

export const metadata: Metadata = {
	title: "Kanban Board",
};

/* export async function getStaticProps() {
	const initialItems = await getItemsfromDb();
	// Props returned will be passed to the page component
	return { props: { initialItems } };
}
 */
