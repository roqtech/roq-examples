import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ChatProvider, RoqProvider } from '@roq/nextjs';
import { SessionProvider, useSession } from 'next-auth/react'
import { clientConfig } from 'config';
import '@roq/nextjs/index.css';
import { roqThemeLight } from 'styles/roq-theme';
import Loader from '../components/loader';
import { PropsWithChildren } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    /*
      The ROQ provider sets the context for inner ROQ components to consume variables such as the session
    */
    return (
        <SessionProvider session={pageProps.session}>
            <WithRoqProvider>
                <Component {...pageProps}/>
            </WithRoqProvider>
        </SessionProvider>
    );
}


const WithRoqProvider = ({ children }: PropsWithChildren) => {
    const { status, data } = useSession();
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
            theme={roqThemeLight}
        >
            <ChatProvider>
                {children}
            </ChatProvider>
        </RoqProvider>
    );
}
