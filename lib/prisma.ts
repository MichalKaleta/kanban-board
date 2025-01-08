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
	//console.log("rECIVED to proSMA", testSendItems);
	const items = await prisma.items.updateMany({
		data: testSendItems,
		where: { userId: "1" },
	});
	return items;
};

export async function createItemsInDb() {
	//await prisma.user.deleteMany();
	//await prisma.items.deleteMany();
	/* 	const user = await prisma.user.create({
		//	data: { login: "test_user", id: "1" },
	}); */
	console.log("NIT:     ", testInitialItems);
	const items = await prisma.items.updateMany({
		data: { ...testSendItems },
	});
	console.log(items);
}
