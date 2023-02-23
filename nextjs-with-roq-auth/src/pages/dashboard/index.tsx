import AppLayout from "layout/app/app.layout";
import { useSession } from "@roq/nextjs";

function DashboardPage() {
  const { session, status } = useSession();

  return (
    <AppLayout title="Files" description="Recent files from users of this app">
      <p>This is a ROQ demo with NextJS and ROQ Auth</p>
      {status === 'authenticated' && <p>👋 You are authenticated!</p>}
      {status === 'unauthenticated' && <p>You are not authorized. Please sign in whith one of examples in the sidebar</p>}
      <code>{JSON.stringify(session)}</code>
    </AppLayout>
  );
}

export default DashboardPage