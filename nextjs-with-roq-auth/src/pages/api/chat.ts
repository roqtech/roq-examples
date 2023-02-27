import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { UserService } from "server/services/user.service";
import { roqClient } from "server/roq";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  try {
    const data = await roqClient.asSuperAdmin().createConversation({
      conversation: {
        title: "Group party",
        ownerId: "6332dce5-5a19-4af9-8f28-7dec1e9d461b",
        isGroup: true,
        memberIds: [
          "6332dce5-5a19-4af9-8f28-7dec1e9d461b",
          "e6f37d1c-0bc5-4451-b0f8-1bfde8de85c6",
        ],
      },
    });

    res.status(200).json({ data });
  } catch (e) {
    console.dir(e);
    res.status(200).json({ success: false });
  }
}

export default function welcomeUser(req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
