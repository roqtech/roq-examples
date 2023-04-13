import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, withAuth } from '@roq/nextjs';
import { roqClient } from '../../../server/roq';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method not allowed' });
        res.end();
    }
    const session = getServerSession(req, res);
    try {
        const { roqUserId: userId } = session;
        const { fileId, entityName, entityReference } = JSON.parse(req.body);
        await roqClient.asUser(userId).createFileAssociation({
            createFileAssociationDto: {
                fileId,
                entityName,
                entityReference
            }
        })
        res.status(200).json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(200).json({ success: false });
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    return withAuth(req, res)(handler);
};
