import { useCallback } from 'react';
import { signup } from 'utils/signup.util';
import { useSession } from '@roq/ui-react';

const RegisterWithMetadata = () => {
    const { status } = useSession();
    const handleSignup = useCallback(
        () =>
            signup({
                isBuyer: true,
            }),
        []
    );

    return (
        <button
            disabled={status === 'authenticated'}
            className="btn btn-sm"
            onClick={handleSignup}
        >
            Sign Up with ROQ as Buyer
        </button>
    );
};

export default RegisterWithMetadata;
