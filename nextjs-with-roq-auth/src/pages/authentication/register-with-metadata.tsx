import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { requireNextAuth } from "@roq/nextjs";

function RegisterWithMetadata() {
  return (
    <AppLayout title="Authentication" description="Send meta data while signing in">
      simple
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(RegisterWithMetadata);
