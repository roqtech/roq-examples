import { Chat } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';

function ChatPage() {
  return (
    <AppLayout>
      <div style={{ width: '100%', height: '90vh' }}>
        <Chat fluid={true} />
      </div>
    </AppLayout>
  );
}

export default ChatPage;