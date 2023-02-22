import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { requireNextAuth } from "@roq/nextjs";

function CustomTheme() {
  return (
    <AppLayout title="UI" description="Custom Theme">
      <style>
        {`
          :root {
            --roq-color-primary: red !important;
            --roq-border-radius: 2px !important;
          }
        `}
      </style>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(CustomTheme);
