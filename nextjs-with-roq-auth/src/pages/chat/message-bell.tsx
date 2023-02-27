


import { ChatMessageBell } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { useRouter } from 'next/router';
import { routes } from 'routes';

function ChatMessageBellPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <DemoLayout>
        <div style={{ height: '700px', width: '200px', display: 'flex', justifyContent: 'end' }}>
          <ChatMessageBell onClick={() => router.push(routes.frontend.chat.simple)} />
        </div>
      </DemoLayout>
    </AppLayout >
  );
}

export default ChatMessageBellPage;