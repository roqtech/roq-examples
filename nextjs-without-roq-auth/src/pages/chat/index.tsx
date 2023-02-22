import { Chat } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';

import { routes } from 'routes';
import { withAuth } from '../../components/hocs';

function ChatPage() {
    return (
        <AppLayout>
            <div style={{ width: '100%', height: '90vh' }}>
                <Chat fluid={true}/>
            </div>
        </AppLayout>
    );
}

export default withAuth({
    redirectIfAuthenticated: false,
    redirectTo: routes.frontend.authentication.simple,
})(ChatPage);
