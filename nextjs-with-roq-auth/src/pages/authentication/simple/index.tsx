import React from 'react';
import AuthLayout from 'layout/auth/auth.layout';
import AppLayout from 'layout/app/app.layout';
import { signIn } from '@roq/nextjs';

export const SimpleLogin = () => {
  return (
    <AppLayout>
      <AuthLayout>
        <button className="btn btn-sm" onClick={signIn}>Sign in with ROQ</button>
      </AuthLayout>
    </AppLayout>
  );
};


export default SimpleLogin;