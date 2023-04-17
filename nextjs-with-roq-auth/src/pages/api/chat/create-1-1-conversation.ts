import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, withAuth } from '@roq/nextjs';
import { faker } from '@faker-js/faker';
import { roqClient } from 'server/roq';
import { randomUUID } from 'crypto';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' });
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
        title: user.createUser.firstName,
        ownerId: session.roqUserId,
        isGroup: false, //Not a group
        memberIds: [user.createUser.id, session.roqUserId],
      },
    });

    const conversations = await roqClient.asUser(session.roqUserId).conversations({
      filter: {
        id: { equalTo: data.createConversation?.id }
      },
      withUsers: true,
    })
    if (conversations.conversations.data.length) {
      const [createConversation] = conversations.conversations.data;
      return res.status(200).json({ data: { createConversation } });
    }
    return res.status(200).json({ success: false });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ success: false });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return withAuth(req, res)(handler);
};
