import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getItemsfromDb } from "@/lib/prisma";
import prisma from "@/lib/prisma";

import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers";

interface Context {
	params: Promise<undefined>;
}

export async function GET(request: NextRequest, context: Context) {
	const items = await getItemsfromDb();
	const res = NextResponse.json(items);
	return res;
}

export async function POST(request: NextRequest, context: Context) {
	const items = await request.json();
	const res = NextResponse.json(items);
	return res;
}
