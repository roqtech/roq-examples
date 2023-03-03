import AppLayout from 'layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';
import { useContext, useLayoutEffect } from 'react';
import { ActionTypeEnum, GlobalContext } from 'context';

export const NotificationSimple = () => {
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
                <div style={{ height: '700px', width: '200px', display: 'flex', justifyContent: 'end' }}>
                    <NotificationBell/>
                </div>
            </DemoLayout>
        </AppLayout>
    )
}

export default NotificationSimple;
