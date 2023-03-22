import styles from 'components/file/files.module.css';
import Card from 'components/card';
import UploadFile from 'components/file/upload-file';

export default function Files() {
    const handleCreateSuccess = () => {
        // mutate();
    };

    const handleDelete = () => {
        // mutate();
    };

  return (
    <div className={styles.feed}>
      <div className={styles.uploadContainer}>
        <Card>
          <UploadFile onSuccess={handleCreateSuccess} onDelete={handleDelete} />
        </Card>
      </div>

      <div className={styles.listContainer}>
      </div>
    </div>
  );
}
