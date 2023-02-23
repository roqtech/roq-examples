import AppLayout from 'layout/app/app.layout';
import { NotificationBell } from '@roq/nextjs';
import { BellIcon } from './bell.icon';

export const CustomNotificationIcon = () => {
  return (
    <AppLayout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <NotificationBell icon={<BellIcon />} />
      </div>
    </AppLayout>
  )
}

export default CustomNotificationIcon;