import { useSession } from "@roq/ui-react";
import { useCallback, useState } from "react";
import useWelcomeNotification from "hooks/use-welcome-notification.hook";

export const WelcomeNotification = () => {
  const { status } = useSession();
  const { welcome, isLoading, success } = useWelcomeNotification();
  const [triedCount, setTriedCount] = useState(0);

  const welcomeMe = useCallback(async () => {
    await welcome();
    setTriedCount((count) => count + 1);
  }, [welcome]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {status === "authenticated" ? (
        <>
          <section role="presentation">
            <button
              className="btn btn-sm"
              onClick={welcomeMe}
              disabled={isLoading}
            >
              Send welcome notification {triedCount > 0 && <>one more time</>}{" "}
              🎉
            </button>
          </section>
          {success && !isLoading && <p>🚀 Notification sent.</p>}
        </>
      ) : (
        <p>You have to sign in to execute the action</p>
      )}
    </div>
  );
};

export default WelcomeNotification;
