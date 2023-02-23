import AppLayout from "layout/app/app.layout";
import { useSession } from "@roq/nextjs";
import styles from './dashboard.module.css'

function DashboardPage() {
  const { session, status } = useSession();

  return (
    <AppLayout title="Files" description="Recent files from users of this app">
      <p>This is a ROQ demo with NextJS and ROQ Auth</p>
      {status === 'authenticated' && <p>👋 You are authenticated!</p>}
      {status === 'unauthenticated' && <p>You are not authorized. Please sign in whith one of examples in the sidebar</p>}
      {session && <div className={styles.codeContainer}>
        <pre>
          <code className={styles.code}>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>}
    </AppLayout >
  );
}

export default DashboardPage