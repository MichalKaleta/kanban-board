import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Context {
	params: undefined;
}

export async function POST(request: NextRequest, context: Context) {
	const items = await request.json();
	//console.log(body);

	// simulate IO latency
	//await new Promise((resolve) => setTimeout(resolve, 500));

	const res = NextResponse.json(items);
	console.log(res);
	return res;
}
