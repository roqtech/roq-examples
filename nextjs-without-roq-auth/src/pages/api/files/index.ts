import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { withAuth } from 'server/middlewares';
import { FileService } from 'server/services/file.service';
import { FileCategories } from 'server/enums';
import { FilesFetchDto } from 'server/dtos/files-fetch.dto';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Method not allowed' });
    res.end();
  }

  const { limit, offset } = req.query as FilesFetchDto;
  const session = await getServerSession(req, res, {});

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

export default function filesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
