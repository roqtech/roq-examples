import { Chat } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { useContext, useLayoutEffect } from 'react';
import { ActionTypeEnum, GlobalContext } from 'context';

function ChatPage() {
    const { dispatch } = useContext(GlobalContext);

    useLayoutEffect(() => {
        dispatch({ type: ActionTypeEnum.SET_CUSTOM_THEME })
        return () => {
            dispatch({ type: ActionTypeEnum.UN_SET_CUSTOM_THEME })
        }
    }, [])
    return (
        <AppLayout>
            <DemoLayout>
                <div style={{ flex: 1, height: '90vh' }}>
                    <Chat fluid={true}/>
                </div>
            </DemoLayout>
        </AppLayout>
    );
}

export default ChatPage;
