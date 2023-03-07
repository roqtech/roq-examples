import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { useCopyToClipboard } from 'react-use';
import styles from 'pages/files/server-side/server-side.module.css';
import useServerSideFileUpload from 'hooks/use-server-side-file-upload.hook';
import { useLayoutEffect } from 'react';

export const FileUploadPage = () => {
    const { initiateUpload, response, isLoading } = useServerSideFileUpload();
    const [_, copyToClipboard] = useCopyToClipboard();
    useLayoutEffect(() => {
        if (response) {
            copyToClipboard(response.url);
        }
    }, [response]);

    return (
        <AppLayout>
            <DemoLayout>
                <div style={{
                    margin: 'auto',
                    maxWidth: '720px'
                }}>
                    <button
                        className={styles.uploadButton}
                        onClick={initiateUpload}
                    >
                        {isLoading ? 'Uploading....' : 'Upload'}
                    </button>
                    {response && (
                        <>
                            <p>File with the name {response.name} has been uploaded and URL has already been copied to
                                your clipboard</p>
                            <p>URL: {response.url}</p>
                        </>
                    )}
                </div>
            </DemoLayout>
        </AppLayout>
    )
}

export default FileUploadPage;
