import React, { useState } from 'react';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import AuthLayout from 'layout/auth/auth.layout';
import { routes } from '../../routes';
import { toast } from 'react-hot-toast';

const FetchConversation = () => {
    const [conversation, setConversation] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const handleCreate = async () => {
        setConversation(null);
        setLoading(true);
        try {
            const response = await fetch(routes.server.chat.createPrivateConversation, {
                method: 'POST',
            });
            const { data } = await response.json();
            setConversation(data?.createConversation);
        } catch (e) {
            console.error(e);
            toast.error('Something went wrong')
        } finally {
            setLoading(false);
        }
    };

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
                    {conversation ? <pre>{JSON.stringify(conversation, null, 4)}</pre> : <></>}
                </AuthLayout>
            </DemoLayout>
        </AppLayout>
    );
}


export default FetchConversation;
