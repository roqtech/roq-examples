import React from 'react';
import AuthLayout from 'layout/auth/auth.layout';
import AppLayout from 'layout/app/app.layout';
import { AuthView } from '../../../views/auth';

export default () => {
    return (
        <AppLayout>
            <AuthLayout>
                <AuthView/>
            </AuthLayout>
        </AppLayout>
    );
};

