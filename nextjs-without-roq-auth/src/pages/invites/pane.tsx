import { UserInvitePane } from '@roq/nextjs';
import { withAuth } from 'components/hocs';
import AppLayout from 'layout/app/app.layout';
import { routes } from '../../routes';

export const InvitePane = () => {
    return (
        <AppLayout>
            <UserInvitePane/>
        </AppLayout>
    )
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(InvitePane)
