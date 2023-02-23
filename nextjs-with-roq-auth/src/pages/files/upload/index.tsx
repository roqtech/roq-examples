import AppLayout from 'layout/app/app.layout';
import { FileUpload } from '@roq/nextjs';

export const FileUploadPage = () => {
  return (
    <AppLayout>
      <FileUpload
        accept={['image/*']}
        fileCategory="USER_FILES"
        onUploadSuccess={(data, id) => console.log('(onUploadSuccess)', { data, id })}
        onFileEdit={(file) => console.log('(onFileEdit)', { file })}
        onUploadFail={(err) => console.error('(onUploadFail)', err)}
      />
    </AppLayout>
  )
}

export default FileUploadPage;