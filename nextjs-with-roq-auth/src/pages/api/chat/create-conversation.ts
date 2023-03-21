import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { faker } from "@faker-js/faker";
import { roqClient } from "server/roq";
import sampleSize from "lodash/sampleSize";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const session = getServerSession(req);

  if (!session.user) {
    res.status(200).json({ success: false });
  }

  try {
    const users = sampleSize(
      await (
        await roqClient.asSuperAdmin().users()
      ).users?.data,
      3
    );

    const data = await roqClient.asUser(session.roqUserId).createConversation({
      conversation: {
        title: faker.company.name(),
        ownerId: session.roqUserId,
        isGroup: true,
        memberIds: [session.roqUserId, users[0].id, users[1].id],
      },
    });

    res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    res.status(200).json({ success: false });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return withAuth(req, res)(handler);
};
