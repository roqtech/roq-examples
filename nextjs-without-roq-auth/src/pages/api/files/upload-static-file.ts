import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';
import { join } from 'path';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { FileService } from 'server/services/file.service';

export default async function filesHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method not allowed' });
        res.end();
    }
    const session = await getServerSession<unknown, Session>(req, res, authOptions);
    try {
        const { roqUserId: userId } = session.user;
        const { fileUploadResponse } = await FileService.uploadStaticFile(join(__dirname, '../../../../../', 'public/brand-big.svg'), userId);
        const { file } = await FileService.file(userId, fileUploadResponse.id);
        res.status(200).json(file);
    } catch (e) {
        console.error(e);
        res.status(200).json({ files: [], totalCount: 0 });
    }
}
