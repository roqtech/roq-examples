import AppLayout from 'layout/app/app.layout';
import dynamic from 'next/dynamic';

const UserInvitePane = dynamic(async () => (await import('@roq/nextjs')).UserInvitePane, { ssr: false })

export const InvitePane = () => {
  return (
    <AppLayout>
      <UserInvitePane />
    </AppLayout>
  )
}

export default InvitePane;