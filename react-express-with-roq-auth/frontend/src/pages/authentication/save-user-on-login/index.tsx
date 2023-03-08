import { useCallback } from 'react';
import { login } from 'utils/login.util';
import { useSession } from '@roq/ui-react';

const SaveOnLogin = () => {
    const { status } = useSession();

    const handleLogin = useCallback(
        () =>
            login({
                syncDb: true,
            }),
        []
    );

    return (
        <button
            className="btn btn-sm"
            disabled={status === 'authenticated'}
            onClick={handleLogin}
        >
            Sign in with ROQ and store in db
        </button>
    );
};

export default SaveOnLogin;
