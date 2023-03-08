import React from 'react';
import { login } from 'utils/login.util';
import { useSession } from '@roq/ui-react';

export const SimpleLogin = () => {
    const { status } = useSession();
    return (
        <button
            className="btn btn-sm"
            onClick={() => login()}
            disabled={status === 'authenticated'}
        >
            Sign in with ROQ
        </button>
    );
};

export default SimpleLogin;
