import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { UserInvitePane } from '@roq/nextjs';


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
