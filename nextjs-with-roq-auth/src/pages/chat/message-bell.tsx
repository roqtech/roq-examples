


import { ChatMessageBell } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';

function ChatMessageBellPage() {
  return (
    <AppLayout>
      <div style={{ width: '100%', height: '90vh' }}>
        <ChatMessageBell />
      </div>
    </AppLayout>
  );
}

export default ChatMessageBellPage;