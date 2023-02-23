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
        {/* TODO that's not flent! */}
        {/* // @ts-ignore */}
        <NotificationBell
        // type={"inread"} 
        />
      </div>
    </AppLayout>
  )
}

export default NotificationUnreadTab;