import AppLayout from 'layout/app/app.layout';
import { FileDropzone } from '@roq/nextjs';

export const FileUploadDropzone = () => {
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

export default FileUploadDropzone;