import dynamic from 'next/dynamic';
import AppLayout from '../../layout/app/app.layout';

const UserInvitesTable = dynamic(async () => (await import('@roq/nextjs')).UserInvitesTable, { ssr: false })

export const InviteTable = () => {
  return (
    <AppLayout>
      <UserInvitesTable />
    </AppLayout>
  );
}


export default InviteTable;