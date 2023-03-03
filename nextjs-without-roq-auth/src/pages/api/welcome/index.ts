import type { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from 'server/services/user.service';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function welcomeUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method not allowed' });
        res.end();
    }
    const session = await getServerSession<unknown, Session>(req, res, authOptions);
    try {
        await UserService.welcomeUser(session.user.roqUserId);
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(200).json({ success: false });
    }
}
