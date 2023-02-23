import AppLayout from '../../../layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';

export const NotificationUnreadTab = () => {
  return (
    <AppLayout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <NotificationBell type={"unread"} />
      </div>
    </AppLayout>
  )
}

export default NotificationUnreadTab;