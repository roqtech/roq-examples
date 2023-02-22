import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { requireNextAuth } from "@roq/nextjs";

function DashboardPage() {
  return (
    <AppLayout title="Files" description="Recent files from users of this app">
      <div className={styles.container}>
        <Files />
      </div>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
