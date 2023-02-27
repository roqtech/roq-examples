import { ChatSidebar, ChatWindow } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

function ControlledChatPafge() {
  const router = useRouter();

  const navigateToConversationRoute = useCallback((cid: string | null) => {
    if (!cid) {
      return;
    }

    if (router.query.cid === cid) {
      return;
    }

    router.push(`/chat/custom?cid=${cid}`, `/chat/custom?cid=${cid}`, { shallow: true })
  }, [router])

  const generateConversationLink = useCallback(({ id }: { id: string }) => `/chat/${id}`, [])

  return (
    <AppLayout>
      <DemoLayout>
        <div style={{
          height: '60vh',
          display: "flex",
          gap: 12,
          flexDirection: "row",
        }}>
          <ChatSidebar
            onCurrentConversationIdChanged={navigateToConversationRoute} generateConversationLink={generateConversationLink}
            style={{
              width: '400px'
            }}
          />
          <ChatWindow conversationId={router.query.cid as string} />
        </div>
      </DemoLayout>
    </AppLayout >
  );
}

export default ControlledChatPafge;