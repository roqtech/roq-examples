import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { requireNextAuth } from "@roq/nextjs";

function AuthenticationSimple() {
  return (
    <AppLayout title="Authentication" description="Simple authentication integration">
      simple
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(AuthenticationSimple);
