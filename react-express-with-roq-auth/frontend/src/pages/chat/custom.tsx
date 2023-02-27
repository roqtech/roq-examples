import { ChatSidebar, ChatWindow } from "@roq/ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";

function ControlledChatPage() {
  const { cid } = useParams();
  const navigate = useNavigate();

  const navigateToConversationRoute = useCallback(
    (chatId: string | null) => {
      if (!chatId) {
        return;
      }

      if (cid === chatId) {
        return;
      }

      navigate(`/chat/custom?cid=${chatId}`);
    },
    [navigate, cid]
  );

  const generateConversationLink = useCallback(
    ({ id }: { id: string }) => `/chat/${id}`,
    []
  );

  return (
    <div
      style={{
        height: "60vh",
        width: "80%",
        display: "flex",
        gap: 12,
        flexDirection: "row",
      }}
    >
      <ChatSidebar
        onCurrentConversationIdChanged={navigateToConversationRoute}
        generateConversationLink={generateConversationLink}
        style={{
          width: "400px",
        }}
      />
      <ChatWindow conversationId={cid} />
    </div>
  );
}

export default ControlledChatPage;
