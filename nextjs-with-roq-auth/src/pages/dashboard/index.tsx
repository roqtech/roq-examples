import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import { requireNextAuth } from "@roq/nextjs";
import styles from "pages/dashboard/dashboard.module.css";

function DashboardPage() {
  return <AppLayout>Dashboard</AppLayout>;
}

export default DashboardPage;
