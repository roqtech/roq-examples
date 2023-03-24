import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { faker } from "@faker-js/faker";
import { roqClient } from "server/roq";
import map from "lodash/map";
import sampleSize from "lodash/sampleSize";
import { randomUUID } from "crypto";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const session = getServerSession(req);

  if (!session.user) {
    return res.status(200).json({ success: false });
  }

  try {
    // Create a user to chat with
    const user = await roqClient.asSuperAdmin().createUser({
      user: {
        firstName: "System",
        lastName: "Bot",
        email: faker.internet.email(),
        password: faker.internet.password(),
        active: true,
        isOptedIn: true,
        customData: {
          countryCode: "EN",
          gender: faker.name.gender(),
        },
        reference: randomUUID(),
      },
    });

    console.log("TAGS ", req.body.tags);

    // Create the conversation
    const conv = await roqClient.asUser(session.roqUserId).createConversation({
      conversation: {
        title: user.createUser.firstName,
        ownerId: session.roqUserId,
        isGroup: false, //Not a group
        memberIds: [user.createUser.id, session.roqUserId],
        tags: req.body.tags,
      },
    });

    console.log("CONV ", conv);

    const message = await roqClient.asSuperAdmin().createMessage({
      message: {
        conversationId: conv.createConversation.id,
        body: `This conversation has the tags ${req.body.tags?.join(", ")}`,
        authorId: user.createUser.id,
        isSystem: true,
      },
    });

    return res.status(200).json({ message });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ success: false });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return withAuth(req, res)(handler);
};
