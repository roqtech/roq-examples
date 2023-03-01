import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import dynamic from 'next/dynamic';

const UserInvitePane = dynamic(async () => (await import('@roq/nextjs')).UserInvitePane, { ssr: false })

export const InvitePane = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{ minWidth: 560 }}>
          <UserInvitePane />
        </div>
      </DemoLayout>
    </AppLayout>
  )
}

export default InvitePane;