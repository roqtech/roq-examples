import AppLayout from 'layout/app/app.layout';
import { UserInvitesTable } from '@roq/nextjs';
import { routes } from 'routes';
import { withAuth } from '../components/hocs';

function InvitesPage() {
    return (
        <AppLayout>
            <UserInvitesTable style={{ background: '#FFF' }}/>
        </AppLayout>
    );
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.login,
})(InvitesPage);
