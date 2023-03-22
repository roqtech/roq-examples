import AppLayout from 'layout/app/app.layout';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import useWelcomeNotification from 'hooks/use-welcome-notification.hook';
import DemoLayout from 'layout/demo/demo.layout';

export const WelcomeNotification = () => {
  const { status } = useSession();
  const { welcome, isLoading, success } = useWelcomeNotification();
  const [triedCount, setTriedCount] = useState(0);

  const welcomeMe = useCallback(async () => {
    await welcome();
    setTriedCount(count => count + 1)
  }, [welcome])

  return (
    <AppLayout>
      <DemoLayout>
        <div style={{ height: '600px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <section role='presentation'>
            <button className="btn btn-sm" onClick={welcomeMe} disabled={isLoading}>Send welcome notification {triedCount > 0 && <>one more time</>} 🎉</button>
          </section>
          {success && !isLoading && <p>🚀 Notification sent.</p>}
        </div>
      </DemoLayout>
    </AppLayout>
  )
}

export default WelcomeNotification;
