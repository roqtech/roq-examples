import AppLayout from 'layout/app/app.layout';
import { FileDropzone } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';

export const FileUploadDropzone = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{
          margin: 'auto',
          maxWidth: '800px'
        }}>
          <FileDropzone
            accept={['image/*']}
            fileCategory="USER_FILES"
          />
        </div>
      </DemoLayout>
    </AppLayout>
  )
}

export default FileUploadDropzone;
