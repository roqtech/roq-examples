import AppLayout from 'layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';
import DemoLayout from 'layout/demo/demo.layout';

export const NotificationSimple = () => {
  return (
    <AppLayout>
      <DemoLayout>
        <div style={{ height: '700px', width: '200px', display: 'flex', justifyContent: 'end' }}>
          <NotificationBell />
        </div>
      </DemoLayout>
    </AppLayout >
  )
}

export default NotificationSimple;