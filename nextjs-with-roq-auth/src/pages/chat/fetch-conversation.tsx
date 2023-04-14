import React, { useCallback, useState } from "react";
import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";
import AuthLayout from "layout/auth/auth.layout";
import { routes } from "../../routes";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const FetchConversation = () => {
  const [conversation, setConversation] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleCreate = async () => {
    setConversation(null);
    setLoading(true);
    try {
      const response = await fetch(
        routes.server.chat.createPrivateConversation,
        {
          method: "POST",
        }
      );
      const { data } = await response.json();
      setConversation(data?.createConversation);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = useCallback(() => {
    if (conversation?.id) {
      router.push(`/chat/controlled?cid=${conversation?.id}`);
    }
  }, [conversation?.id, router]);

  return (
    <AppLayout>
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <button
            className="btn btn-sm"
            onClick={handleCreate}
            disabled={isLoading}
          >
            Create Conversation
          </button>
          {conversation ? (
            <>
              <pre>{JSON.stringify(conversation, null, 4)}</pre>
              <button className="btn btn-sm mt-1" onClick={handleRedirect}>
                Show Conversation
              </button>
            </>
          ) : (
            <></>
          )}
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default FetchConversation;
