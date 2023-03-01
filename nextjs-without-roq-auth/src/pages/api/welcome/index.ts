import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { UserService } from "server/services/user.service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const session = getServerSession(req, res);

  try {
    await UserService.welcomeUser(session.roqUserId);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false });
  }
}

export default function welcomeUser(req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
