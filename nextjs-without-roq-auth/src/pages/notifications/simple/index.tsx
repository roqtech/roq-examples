import AppLayout from '../../../layout/app/app.layout';
import { withAuth } from '../../../components/hocs';
import { routes } from '../../../routes';
import { NotificationBell } from '@roq/nextjs';

export const NotificationSimple = () => {
    return (
        <AppLayout>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <NotificationBell/>
            </div>
        </AppLayout>
    )
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(NotificationSimple)
