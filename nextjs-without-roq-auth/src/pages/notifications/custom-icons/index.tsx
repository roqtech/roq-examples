import AppLayout from '../../../layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';
import { withAuth } from 'components/hocs';
import { routes } from '../../../routes';
import { BellIcon } from './bell.icon';

export const CustomIcon = () => {
    return (
        <AppLayout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <NotificationBell icon={<BellIcon/>}/>
            </div>
        </AppLayout>
    )
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(CustomIcon)
