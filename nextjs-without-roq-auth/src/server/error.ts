import { NextApiResponse } from 'next';

export enum ErrorCodes {
    AUTH_FAILED = 'AUTH_FAILED',
}

interface ErrorInfo {
    code: number;
    codeText: string;
    message: string;
}

type RoqError = {
    [key in ErrorCodes]: ErrorInfo;
};

export const RoqErrors: RoqError = {
    AUTH_FAILED: {
        code: 401,
        codeText: ErrorCodes.AUTH_FAILED,
        message: 'Invalid credentials provided',
    },
};

export const sendError = (res: NextApiResponse, key: keyof typeof RoqErrors) => {
    const error = RoqErrors[key];
    res.status(error.code).json({ code: error.codeText, message: error.message });
};
