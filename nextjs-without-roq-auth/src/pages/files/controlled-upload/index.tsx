import { withAuth } from 'components/hocs';
import AppLayout from 'layout/app/app.layout';
import { routes } from '../../../routes';
import Files from '../../../components/file/files';

export const FileUpload = () => {
    return (
        <AppLayout>
            <Files/>
        </AppLayout>
    )
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(FileUpload)
