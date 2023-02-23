import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@roq/nextjs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  try {
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ files: [], totalCount: 0 });
  }
}

export default function asBuyerRegisterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
