import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ErrorCodes, sendError } from '../error';
import { getServerSession } from 'next-auth';

export const withAuth = (req: NextApiRequest, res: NextApiResponse) => {
    return async function (handler: NextApiHandler) {
        const session = await getServerSession(req, res, {});

        // Check token exists
        if (!session) {
            return sendError(res, ErrorCodes.AUTH_FAILED);
        }

        handler(req, res);
    };
};
