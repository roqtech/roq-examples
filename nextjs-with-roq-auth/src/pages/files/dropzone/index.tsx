import AppLayout from 'layout/app/app.layout';
import { FileDropzone } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';

export const FileUploadDropzone = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{
          margin: 'auto',
          maxWidth: '720px'
        }}>
          <FileDropzone
            accept={['image/*']}
            fileCategory="USER_FILES"
            onUploadSuccess={(data, id) => console.log('(onUploadSuccess)', { data, id })}
            onFileEdit={(file) => console.log('(onFileEdit)', { file })}
            onUploadFail={(err) => console.error('(onUploadFail)', err)}
          />
        </div>
      </DemoLayout>
    </AppLayout>
  )
}

export default FileUploadDropzone;