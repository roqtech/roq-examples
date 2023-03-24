import { useState } from "react";
import { Chat } from "@roq/nextjs";
import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";
import { routes } from "routes";

function ChatPage() {
  const [tags, setTags] = useState<string[] | undefined>();
  const defaultTags = ["project", "retrospective"];

  const handleCreatePrivateConversation = async () => {
    setTags(undefined);
    fetch(routes.server.chat.createPrivateConversation, { method: "POST" });
  };

  const handleCreateGroupConversation = async () => {
    setTags(undefined);
    fetch(routes.server.chat.createGroupConversation, { method: "POST" });
  };

  const handleSendSystemMessage = async () => {
    setTags(undefined);
    fetch(routes.server.chat.sendSystemMessage, { method: "POST" });
  };

  const handleCreateConversationWithTags = async () => {
    setTags(defaultTags);
    fetch(routes.server.chat.createConversationWithTags, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: defaultTags }),
    });
  };

  return (
    <AppLayout>
      <DemoLayout>
        <div className="m5">
          <button
            className="btn btn-sm m5"
            onClick={handleCreatePrivateConversation}
          >
            Create a 1:1 conversation
          </button>
          <button
            className="btn btn-sm m5"
            onClick={handleCreateGroupConversation}
          >
            Create a group conversation
          </button>
          <button className="btn btn-sm m5" onClick={handleSendSystemMessage}>
            Send a "system" message
          </button>
          <button
            className="btn btn-sm"
            onClick={handleCreateConversationWithTags}
          >
            Create a conversation with tags {JSON.stringify(defaultTags)}
          </button>
        </div>

        {tags?.length ? (
          <h3>Showing conversations with tags {JSON.stringify(defaultTags)}</h3>
        ) : (
          <></>
        )}

        <div style={{ flex: 1, height: "80vh" }}>
          <Chat fluid={true} tags={tags} />
        </div>
      </DemoLayout>
    </AppLayout>
  );
}

export default ChatPage;
