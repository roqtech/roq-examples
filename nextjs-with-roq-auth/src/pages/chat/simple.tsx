import { Chat } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';

function ChatPage() {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{ flex: 1, height: '90vh' }}>
          <Chat fluid={true} />
        </div>
      </DemoLayout>
    </AppLayout>
  );
}

export default ChatPage;