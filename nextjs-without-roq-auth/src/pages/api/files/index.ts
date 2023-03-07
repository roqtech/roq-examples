import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { FileService } from 'server/services/file.service';
import { FileCategories } from 'server/enums';
import { FilesFetchDto } from 'server/dtos/files-fetch.dto';

export default async function filesHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Method not allowed' });
    res.end();
  }

  const { limit, offset } = req.query as FilesFetchDto;
  const session = await getServerSession<unknown, Session>(req, res, authOptions);

  try {
    const files = await FileService.getFilesForFeed(
        session?.user?.roqUserId,
        FileCategories.userFiles,
        limit,
        offset
    );
    res.status(200).json(files);
  } catch (e) {
    res.status(200).json({ files: [], totalCount: 0 });
  }
}
