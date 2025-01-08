import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
	createItemsInDb,
	getItemsfromDb,
	reorderItemsInDb,
} from "@/lib/prisma";
import { testSendItems } from "@/prisma/testData";

interface Context {
	params: Promise<undefined>;
}

export async function GET(request: NextRequest, context: Context) {
	const items = await getItemsfromDb();
	const res = NextResponse.json(items);
	return res;
}

export async function POST(request: NextRequest, context: Context) {
	//const items = await request.json();
	const items = testSendItems;
	if (items !== null) {
		//await reorderItemsInDb(items);
		await createItemsInDb();
	}
	const res = NextResponse.json(items);
	return res;
}
