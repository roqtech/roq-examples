import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { NotificationBell, requireNextAuth } from "@roq/nextjs";

function NotificationsUnreadTab() {
  return (
    <AppLayout title="Notifications" description="Notification show unread tab">
      <div style={{ width: 500, display: "flex", justifyContent: "right" }}>
        <NotificationBell />
      </div>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(NotificationsUnreadTab);
