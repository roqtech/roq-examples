import AuthLayout from 'layout/auth/auth.layout';
import AppLayout from 'layout/app/app.layout';
import { AuthView } from '../../../views/auth';

const Login = () => {
    return (
        <AppLayout>
            <AuthLayout>
                <AuthView/>
            </AuthLayout>
        </AppLayout>
    );
};


export default Login;
