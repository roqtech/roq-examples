import AppLayout from 'layout/app/app.layout';
import { useSession } from '@roq/nextjs';
import { useCallback } from 'react';
import useWelcomeNotification from 'hooks/use-welcome-notification.hook';

export const WelcomeNotification = () => {
  const { status } = useSession();
  const { welcome, isLoading, success } = useWelcomeNotification();

  const welcomeMe = useCallback(() => welcome(), [welcome])

  return (
    <AppLayout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>

        {status === 'authenticated' ? (
          <>
            <section role='presentation'>
              <button className="btn btn-sm" onClick={welcomeMe} disabled={isLoading}>Send welcome notification one more time 🎉</button>
            </section>
            {success && !isLoading && <p>🚀 Notification sent.</p>}
          </>
        ) : <p>You have to sign in to execute the action</p>
        }
      </div>
    </AppLayout>
  )
}

export default WelcomeNotification;