import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, withAuth } from '@roq/nextjs';
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
    const user = await UserService.createUser();

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


    await roqClient.asSuperAdmin().createMessage({
      message: {
        conversationId: conv.createConversation.id,
        body: `This conversation has the tags ${req.body.tags?.join(', ')}`,
        authorId: user.createUser.id,
        isSystem: true,
      },
    });

    return res.status(200).json({ data: conv });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ success: false });
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return withAuth(req, res)(handler);
};
