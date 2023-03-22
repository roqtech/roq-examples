import AppLayout from '../../layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { UserInvitesTable } from '@roq/nextjs';


export const InviteTable = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <UserInvitesTable />
      </DemoLayout>
    </AppLayout>
  );
}


export default InviteTable;
