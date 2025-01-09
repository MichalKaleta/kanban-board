import { PrismaClient } from "@prisma/client";
import { TaskItem } from "@/app/components/kanban/types";
import { testSendItems, testInitialItems } from "@/prisma/testData";

declare global {
	var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;

export const getItemsfromDb = async () => {
	const items = await prisma.items.findMany({
		where: { userId: "1" },
	});
	return items;
};

export const reorderItemsInDb = async (reorderedItems: TaskItem[]) => {
	await prisma.items.deleteMany({
		where: { userId: "1" },
	});
	const items = await prisma.items.createMany({
		data: reorderedItems,
	});
	return items;
};

/* export async function createItemsInDb() {
	await prisma.items.createMany({
		data: testInitialItems,
	});
} */
