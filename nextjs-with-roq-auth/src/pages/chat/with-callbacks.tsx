import { Chat } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import toast from 'react-hot-toast';

function ChatPage() {
    return (
        <AppLayout>
            <DemoLayout>
                <div style={{ flex: 1, height: '90vh' }}>
                    <Chat
                        onMessageSent={(message: unknown) => {
                            toast.success('Sent!');
                            console.log('(onMessageSent)', { message });
                        }}
                        fluid={true}
                    />
                </div>
            </DemoLayout>
        </AppLayout>
    );
}

export default ChatPage;
