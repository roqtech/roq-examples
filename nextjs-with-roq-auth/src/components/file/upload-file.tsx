/*
  This component showcases the ROQ File upload feature in the controlled mode
  i.e You can manually preview and trigger the upload of the file after it is selected
*/

import React, { useState } from 'react';
import styles from 'components/file/upload-file.module.css';
import { FileUpload, useRoqFileUploader } from '@roq/nextjs';
import { FileInterface } from '@roq/ui-react/dist/features';
import { toast } from 'react-hot-toast';

interface UploadFileProps {
  onSuccess?: (file: FileInterface) => void;
  onDelete?: (id: string) => void;
}

export default function UploadFile({ onSuccess, onDelete }: UploadFileProps) {
  const [newFile, setNewFile] = useState<FileInterface | File>();

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      onSuccess?.(file);
      setNewFile(undefined);
    },
    onUploadFail: (err) => {
      console.error(err);
      toast.error('File Upload Failed');
    },
    onChange: ([file]) => {
      setNewFile(file);
    },
    fileCategory: "USER_FILES",
    onUploadRemoved: onDelete,
  });

  // Trigger the upload manually, by calling the uploadFile function
  const handleUpload = async () => {
    return fileUploader.uploadFile({
      file: newFile as File,
      temporaryId: Date.now().toString(),
    });
  };

  return (
    <div className={styles.uploadContainer}>
      {/* Display the file selector button */}
      <FileUpload
        fileUploader={fileUploader}
        accept={["image/*"]}
        fileCategory="USER_FILES"
      />{" "}
      {!newFile ? (
        <div className={styles.prompt}>
          👆 This is a ROQ <strong>{`  <FileUpload />  `}</strong> Component.
          Use it to pick and preview an image. The upload is triggered from the
          parent component
        </div>
      ) : (
        <></>
      )}
      {/* Images can be previewed using the previews property of the file uploader object */}
      {newFile ? (
        <img className={styles.preview} src={fileUploader.previews?.[0]?.url} />
      ) : (
        <></>
      )}
      {newFile ? (
        <button disabled={!newFile} className="btn" onClick={handleUpload}>
          Start upload
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
