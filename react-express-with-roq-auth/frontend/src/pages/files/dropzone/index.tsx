import { FileDropzone } from "@roq/ui-react";

export const FileUploadDropzone = () => {
  return (
    <FileDropzone
      accept={["image/*"]}
      fileCategory="USER_FILES"
      onUploadSuccess={(data, id) =>
        console.log("(onUploadSuccess)", { data, id })
      }
      onFileEdit={(file) => console.log("(onFileEdit)", { file })}
      onUploadFail={(err) => console.error("(onUploadFail)", err)}
    />
  );
};

export default FileUploadDropzone;
