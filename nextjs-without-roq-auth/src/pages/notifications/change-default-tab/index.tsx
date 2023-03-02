import DemoLayout from 'layout/demo/demo.layout';
import AppLayout from '../../../layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';

export const NotificationUnreadTab = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{ height: '700px', width: '200px', display: 'flex', justifyContent: 'end' }}>
          {/* TODO that's not flent! */}
          {/* // @ts-ignore */}
          <NotificationBell
          // type={"inread"} 
          />
        </div>
      </DemoLayout>
    </AppLayout>
  )
}

export default NotificationUnreadTab;