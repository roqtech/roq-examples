import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { requireNextAuth } from "@roq/nextjs";
import DemoLayout from "layout/demo/demo.layout";

function CustomTheme() {
  return (
    <AppLayout title="UI" description="Custom Theme">
      <DemoLayout>
        <style>
          {`
          :root {
            --roq-color-primary: red !important;
            --roq-border-radius: 2px !important;
          }
        `}
        </style>
      </DemoLayout>
    </AppLayout>
  );
}

export default CustomTheme;