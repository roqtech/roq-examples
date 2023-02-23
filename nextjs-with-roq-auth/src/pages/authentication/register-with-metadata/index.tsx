import AuthLayout from 'layout/auth/auth.layout';
import AppLayout from 'layout/app/app.layout';
import { useCallback } from 'react';
import { signup } from 'utils/signup.util';

const RegisterWithMetadata = () => {
  const handleSignup = useCallback(() => signup({
    isBuyer: true
  }), [])

  return (
    <AppLayout>
      <AuthLayout>
        <button className="btn btn-sm" onClick={handleSignup}>Sign Up with ROQ as Buyer</button>
      </AuthLayout>
    </AppLayout>
  );
};


export default RegisterWithMetadata;
