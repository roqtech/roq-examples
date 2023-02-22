import { Chat, requireNextAuth } from "@roq/nextjs";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";
import styles from "pages/chat/chat.module.css";

function ChatPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className={styles.chatContainer}>
        <Chat fluid />
      </div>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
