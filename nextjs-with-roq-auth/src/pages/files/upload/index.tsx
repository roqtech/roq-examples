import AppLayout from 'layout/app/app.layout';
import { FileUpload } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';

export const FileUploadPage = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{
          margin: 'auto',
          maxWidth: '720px'
        }}>
          <FileUpload
            accept={['image/*']}
            fileCategory="USER_FILES"
            onUploadSuccess={(data, id) => console.log('(onUploadSuccess)', { data, id })}
            onFileEdit={(file) => console.log('(onFileEdit)', { file })}
            onUploadFail={(err) => console.error('(onUploadFail)', err)}
          />
        </div>
      </DemoLayout>
    </AppLayout >
  )
}

export default FileUploadPage;