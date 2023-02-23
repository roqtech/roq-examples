import AppLayout from '../../layout/app/app.layout';
import { UserInvitesTable } from '@roq/nextjs';

export const InviteTable = () => {
  return (
    <AppLayout>
      <UserInvitesTable />
    </AppLayout>
  );
}


export default InviteTable;