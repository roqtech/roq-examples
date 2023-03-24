import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { faker } from "@faker-js/faker";
import { roqClient } from "server/roq";
import map from "lodash/map";
import sampleSize from "lodash/sampleSize";
import { randomUUID } from "crypto";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const session = getServerSession(req);

  if (!session.user) {
    return res.status(200).json({ success: false });
  }

  try {
    const users = sampleSize(
      await (
        await roqClient.asSuperAdmin().users({ limit: 10 })
      ).users?.data,
      5
    );

    // Create a user to chat with
    const userOne = await roqClient.asSuperAdmin().createUser({
      user: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
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

    // Create a second user to chat with
    const userTwo = await roqClient.asSuperAdmin().createUser({
      user: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
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

    // Create the conversation
    const data = await roqClient.asUser(session.roqUserId).createConversation({
      conversation: {
        title: faker.commerce.department(),
        ownerId: session.roqUserId,
        isGroup: true, //Group
        memberIds: [
          userOne.createUser.id,
          userTwo.createUser.id,
          session.roqUserId,
        ],
      },
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ success: false });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return withAuth(req, res)(handler);
};
