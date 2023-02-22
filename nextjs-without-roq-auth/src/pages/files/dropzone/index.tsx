import { withAuth } from 'components/hocs';
import AppLayout from 'layout/app/app.layout';
import { routes } from '../../../routes';
import { FileDropzone } from '@roq/nextjs';

export const FileUpload = () => {
    return (
        <AppLayout>
            <FileDropzone
                accept={['image/*']}
                fileCategory="USER_FILES"
                onUploadSuccess={(data, id) => console.log('(onUploadSuccess)', { data, id })}
                onFileEdit={(file) => console.log('(onFileEdit)', { file })}
                onUploadFail={(err) => console.error('(onUploadFail)', err)}
            />
        </AppLayout>
    )
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(FileUpload)
