import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ChatProvider, RoqProvider } from '@roq/nextjs';
import { SessionProvider, useSession } from 'next-auth/react'
import { clientConfig } from 'config';
import '@roq/nextjs/index.css';
import Loader from '../components/loader';
import { PropsWithChildren, useContext } from 'react';
import { GlobalContext } from '../context';
import { GlobalProvider } from '../providers';

export default function App({ Component, pageProps }: AppProps) {
    /*
      The ROQ provider sets the context for inner ROQ components to consume variables such as the session
    */
    return (
        <GlobalProvider>
            <SessionProvider
                session={pageProps.session}
                refetchInterval={60}
            >
                <WithRoqProvider>
                    <Component {...pageProps}/>
                </WithRoqProvider>
            </SessionProvider>
        </GlobalProvider>
    );
}


const WithRoqProvider = ({ children }: PropsWithChildren) => {
    const { status, data } = useSession();
    const { state } = useContext(GlobalContext)
    if (status === 'loading') {
        return <Loader/>;
    }
    return (
        <RoqProvider
            config={{
                host: clientConfig.roq.platformURL,
                token: (data?.user as any)?.roqToken,
                auth: {
                    useRoqAuth: false,
                },
            }}
            theme={state?.theme}
        >
            <ChatProvider>
                {children}
            </ChatProvider>
        </RoqProvider>
    );
}
