import { ReactNode, useMemo } from 'react';
import { useSession } from '@roq/ui-react';

interface DemoLayoutProps {
    requireSession?: boolean;
    children?: ReactNode;
}

const LockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={48}
        height={48}
    >
        <path
            d="M12 1C8.676 1 6 3.676 6 7v1H4v14h16V8h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
            fill="currentColor"/>
    </svg>
)

const LockBox = () => (
    <div className="lockBox">
        <div className="lockBoxContent">
            <LockIcon/>
            <h1>No session</h1>
            <div>
                Authorize through one of the user management methods to have an access for example.
            </div>
        </div>
    </div>
)


export default function DemoLayout({ requireSession = true, children }: DemoLayoutProps) {
    const { session } = useSession();
    const isLocked = useMemo(() => requireSession
            ? !session?.id
            : false
        , [session, requireSession])

    return (
        <div className="demo">
            {isLocked && <LockBox/>}
            <div className={`content ${isLocked ? 'locked' : ''}`}>
                {children}
            </div>
        </div>
    );
}
