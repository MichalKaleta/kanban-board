import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		console.log(req);
	} else {
		// Handle any other HTTP method
	}
}
