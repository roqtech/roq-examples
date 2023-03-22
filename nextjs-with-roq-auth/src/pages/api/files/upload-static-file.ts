import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { FileService } from 'server/services/file.service';
import { getServerSession } from '@roq/nextjs';

export default async function filesHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Method not allowed' });
        res.end();
    }
    const session = getServerSession(req, res);
    try {
        const { roqUserId: userId } = session;
        const { fileUploadResponse } = await FileService.uploadStaticFile(join(__dirname, '../../../../../', 'public/brand-big.svg'), userId);
        const { file } = await FileService.file(userId, fileUploadResponse.id);
        res.status(200).json(file);
    } catch (e) {
        console.error(e);
        res.status(200).json({ files: [], totalCount: 0 });
    }
}
