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
    // Get latest conversation
    let conv
    const convs = await roqClient.asUser(session.roqUserId).conversations();
    if (!convs || convs.conversations?.data?.length === 0) {
      const user = await UserService.createUser();
      // Create the conversation
      const data = await roqClient.asUser(session.roqUserId).createConversation({
        conversation: {
          title: user.createUser.firstName,
          ownerId: session.roqUserId,
          isGroup: false, //Not a group
          memberIds: [user.createUser.id, session.roqUserId],
        },
      });
      conv = data.createConversation;
    } else {
      conv = convs.conversations?.data?.[0];
    }

    await roqClient.asSuperAdmin().createMessage({
      message: {
        conversationId: conv.id,
        body: `This is a sample message send from current logged user in server side`,
        authorId: session.roqUserId,
        isSystem: false,
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
