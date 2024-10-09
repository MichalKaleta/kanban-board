import type { Metadata } from "next";
import { Board } from "./components/kanban/board/Board";
import prisma from "../lib/prisma";
import { testUserItems } from "./../prisma/testData";

async function addTestUser() {
	await prisma.user.deleteMany();
	await prisma.items.deleteMany();
	const user = await prisma.user.create({
		data: { login: "test_user", id: "1" },
	});
	const items = await prisma.items.createMany({
		data: testUserItems,
	});
	console.log(items);
}

//addTestUser();

export default function IndexPage() {
	return <Board />;
}

export const metadata: Metadata = {
	title: "Kanban Board",
};
