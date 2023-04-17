import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { UserProfile } from '@roq/nextjs';

const Profile = () => {
    return (
        <AppLayout>
            <DemoLayout>
                <div style={{
                    margin: 'auto',
                    maxWidth: '720px'
                }}>
                    <UserProfile/>
                </div>
            </DemoLayout>
        </AppLayout>
    )
};

export default Profile
