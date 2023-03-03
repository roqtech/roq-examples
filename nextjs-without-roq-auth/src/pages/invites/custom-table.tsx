import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { UserInvitesTable } from '@roq/nextjs';
import { useContext, useLayoutEffect } from 'react';
import { ActionTypeEnum, GlobalContext } from 'context';

export const CustomTable = () => {
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
                <UserInvitesTable/>
            </DemoLayout>
        </AppLayout>
    );
}


export default CustomTable;
