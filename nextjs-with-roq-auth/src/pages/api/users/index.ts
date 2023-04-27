import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@roq/nextjs';
import { UserService } from '../../../server/services/user.service';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' });
    res.end();
  }
  const user = await UserService.createUser();
  res.status(200).json({ user: user.createUser });
}

export default function filesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
