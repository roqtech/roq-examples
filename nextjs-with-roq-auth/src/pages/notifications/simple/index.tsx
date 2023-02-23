import AppLayout from 'layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';

export const NotificationSimple = () => {
  return (
    <AppLayout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <NotificationBell />
      </div>
    </AppLayout>
  )
}

export default NotificationSimple;