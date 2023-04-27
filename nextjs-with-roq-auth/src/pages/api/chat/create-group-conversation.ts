import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, withAuth } from '@roq/nextjs';
import { faker } from '@faker-js/faker';
import { roqClient } from 'server/roq';
import { UserService } from '../../../server/services/user.service';

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
    const userOne = await UserService.createUser();
    // Create a second user to chat with
    const userTwo = await UserService.createUser();

    const { groupName } = JSON.parse(req?.body);
    // Create the conversation
    const data = await roqClient.asUser(session.roqUserId).createConversation({
      conversation: {
        title: groupName || faker.commerce.department(),
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
