import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { useContext, useLayoutEffect } from 'react';
import { ActionTypeEnum, GlobalContext } from 'context';
import { UserInvitePane } from '@roq/nextjs';

export const InvitePane = () => {
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
                <div style={{ minWidth: 560 }}>
                    <UserInvitePane/>
                </div>
            </DemoLayout>
        </AppLayout>
    )
}

export default InvitePane;
