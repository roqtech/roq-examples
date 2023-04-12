import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Method not allowed' });
        res.end();
    }
    try {
        res.status(200).json({
            data: [
                { entityName: 'Restaurant', entityReference: '0127a2d1-8877-4534-9fac-f3d57ac4021c' },
                { entityName: 'Organization', entityReference: '39aa4ef6-257a-4d2a-9343-d2cd3d2deb79' },
                { entityName: 'Team', entityReference: 'b199fae1-bc38-4b3c-9bae-d35108f38a65' },
            ],
            totalCount: 3,
        });
    } catch (e) {
        console.error(e);
        res.status(200).json({ associations: [], totalCount: 0 });
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    return withAuth(req, res)(handler);
};
