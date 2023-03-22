import { AuthView } from 'pages/auth';

const RegisterWithMetadata = () => {
    return (
        <AuthView metaData={{ role: 'buyer' }}/>
    );
};

export default RegisterWithMetadata;
