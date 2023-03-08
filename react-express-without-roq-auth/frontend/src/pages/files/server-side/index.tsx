import { useCopyToClipboard } from 'react-use';
import styles from 'pages/files/server-side/server-side.module.css';
import useServerSideFileUpload from 'hooks/use-server-side-file-upload.hook';
import { useLayoutEffect } from 'react';

export const FileUploadPage = () => {
    const { initiateUpload, response, isLoading } = useServerSideFileUpload();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, copyToClipboard] = useCopyToClipboard();

    useLayoutEffect(() => {
        if (response) {
            copyToClipboard(response.url);
        }
    }, [response, copyToClipboard]);

    return (
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
    )
}

export default FileUploadPage;
