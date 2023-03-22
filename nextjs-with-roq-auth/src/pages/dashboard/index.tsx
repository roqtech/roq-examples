import AppLayout from "layout/app/app.layout";
import Link from "next/link";
import { useSession } from "@roq/nextjs";
import styles from "./dashboard.module.css";

function DashboardPage() {
  const { session, status } = useSession();

  return (
    <AppLayout
      title="Example"
      description="This app is set of examples for using ROQ's UI components, and backend APIs"
    >
      <div>
        <p>This demo uses NextJS, with prisma, and ROQ Auth</p>
        {status === "authenticated" && <p>👋 You are authenticated!</p>}
        {status === "unauthenticated" && (
          <p>
            You are not signed in. Please{" "}
            <Link href="/authentication">sign in</Link> with one of examples in
            the sidebar
          </p>
        )}
        {session && (
          <div className={styles.codeContainer}>
            <pre>
              <code className={styles.code}>
                {JSON.stringify(session.user, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
