import AuthLayout from 'layout/auth/auth.layout';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import React from 'react';
import { AuthView } from '../../../views/auth';

const RegisterWithMetadata = () => {
    return (
        <AppLayout>
            <DemoLayout requireSession={false}>
                <AuthLayout>
                    <AuthView metaData={{ type: 'buyer' }}/>
                </AuthLayout>
            </DemoLayout>
        </AppLayout>
    );
};


export default RegisterWithMetadata;
