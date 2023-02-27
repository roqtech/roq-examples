
import AppLayout from 'layout/app/app.layout';
import Files from '../../../components/file/files';
import DemoLayout from 'layout/demo/demo.layout';

export const FileUpload = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <Files />
      </DemoLayout>
    </AppLayout>
  )
}

export default FileUpload;