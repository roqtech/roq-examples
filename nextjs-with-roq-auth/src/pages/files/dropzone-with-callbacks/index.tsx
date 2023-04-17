import AppLayout from 'layout/app/app.layout';
import { FileDropzone } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';
import toast from 'react-hot-toast';

export const FileUploadDropzone = () => {
    return (
        <AppLayout>
            <DemoLayout>
                <div style={{
                    margin: 'auto',
                    maxWidth: '800px',
                }}>
                    <FileDropzone
                        accept={['image/*']}
                        fileCategory="USER_FILES"
                        onUploadSuccess={(data, id) => {
                            toast.success(`Uploaded Successfully!`);
                            console.log('(onUploadSuccess)', { data, id })
                        }}
                        onUploadFail={(err) => {
                            toast.error(`Upload Failed!\n ${err}`);
                            console.error('(onUploadFail)', err);
                        }}
                        onFileEdit={(file) => {
                            toast.success(`File Updated!`);
                            console.log('(onFileEdit)', { file })
                        }}
                        onFileDelete={(id) => {
                            toast.success(`Deleted!`);
                            console.log('(onFileDelete)', { id })
                        }}
                    />
                </div>
            </DemoLayout>
        </AppLayout>
    )
}

export default FileUploadDropzone;
