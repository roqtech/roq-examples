import AppLayout from '../../../layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';
import { NotificationListTypeEnum } from '@roq/ui-react/dist/features/notifications/enums';
import { withAuth } from 'components/hocs';
import { routes } from '../../../routes';

export const UnreadtTab = () => {
    return (
        <AppLayout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <NotificationBell type={NotificationListTypeEnum.UNREAD}/>
            </div>
        </AppLayout>
    )
}


export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple
})(UnreadtTab)
