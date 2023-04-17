import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, withAuth } from '@roq/nextjs';
import { roqClient } from '../../../server/roq';

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
        const { id } = JSON.parse(req?.body);
        const data = await roqClient
            .asUser(session.roqUserId)
            .deleteConversation({
                id
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
