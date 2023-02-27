import dynamic from 'next/dynamic';
import AppLayout from '../../layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';

const UserInvitesTable = dynamic(async () => (await import('@roq/nextjs')).UserInvitesTable, { ssr: false })

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