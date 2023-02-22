import AppLayout from '../../layout/app/app.layout';
import { UserInvitesTable } from '@roq/nextjs';
import { withAuth } from 'components/hocs';
import { routes } from '../../routes';

export const InviteTable = () => {
    return (
        <AppLayout>
            <UserInvitesTable/>
        </AppLayout>
    );
}


export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(InviteTable)
