import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { requireNextAuth } from "@roq/nextjs";

function InvitesTable() {
  return (
    <AppLayout title="Authentication" description="Invite users table">
      Invite users table
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(InvitesTable);
