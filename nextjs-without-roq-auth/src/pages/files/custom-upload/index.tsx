import AppLayout from 'layout/app/app.layout';
import { FileUpload } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';
import { useContext, useLayoutEffect } from 'react';
import { ActionTypeEnum, GlobalContext } from 'context';

export const FileUploadPage = () => {
    const { dispatch } = useContext(GlobalContext);

    useLayoutEffect(() => {
        dispatch({ type: ActionTypeEnum.SET_CUSTOM_THEME })
        return () => {
            dispatch({ type: ActionTypeEnum.UN_SET_CUSTOM_THEME })
        }
    }, [])
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
        </AppLayout>
    )
}

export default FileUploadPage;
