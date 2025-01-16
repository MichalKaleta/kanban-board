import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
	getItemsfromDb,
	reorderItemsInDb,
	createTestItemInDb,
} from "@/lib/prisma";

export async function GET(request: NextRequest) {
	const items = await getItemsfromDb();
	const res = NextResponse.json(items);
	return res;
}

export async function POST(request: NextRequest) {
	const items = await request.json();
	await reorderItemsInDb(items);
	const res = NextResponse.json(items);
	return res;
}

export async function PUT(request: NextRequest) {
	const item = await request.json();
	await createTestItemInDb(item);
	const res = NextResponse.json(item);
	return res;
}
