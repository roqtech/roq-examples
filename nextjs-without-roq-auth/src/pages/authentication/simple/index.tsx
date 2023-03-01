import React from 'react';
import AuthLayout from 'layout/auth/auth.layout';
import DemoLayout from 'layout/demo/demo.layout';
import AppLayout from 'layout/app/app.layout';
import { AuthView } from '../../../views/auth';

export const SimpleLogin = () => {
    return (
        <AppLayout title="Authentication"
                   description="Simple authentication. Basic User will be created on both sides (Local & ROQ ) ">
            <DemoLayout requireSession={false}>
                <AuthLayout>
                    <AuthView/>
                </AuthLayout>
            </DemoLayout>
        </AppLayout>
    );
};


export default SimpleLogin;
