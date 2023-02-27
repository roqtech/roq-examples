import { useSession } from "@roq/ui-react";
import styles from "./dashboard.module.css";

function DashboardPage() {
  const { session, status } = useSession();

  return (
    <>
      <p>This is a ROQ demo with NextJS and ROQ Auth</p>
      {status === "authenticated" && <p>👋 You are authenticated!</p>}
      {status === "unauthenticated" && (
        <p>
          You are not authorized. Please sign in with one of examples in the
          sidebar
        </p>
      )}
      {session && (
        <div className={styles.codeContainer}>
          <pre>
            <code className={styles.code}>
              {JSON.stringify(session, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
