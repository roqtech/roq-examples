import { UserInvitePane } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';

export const InvitePane = () => {
  return (
    <AppLayout>
      <UserInvitePane />
    </AppLayout>
  )
}

export default InvitePane;