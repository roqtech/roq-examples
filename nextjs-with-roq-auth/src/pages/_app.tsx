import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ChatProvider, RoqProvider } from '@roq/nextjs';
import { clientConfig } from 'config';
import '@roq/nextjs/index.css';
import { GlobalProvider } from 'providers';
import { GlobalContext } from '../context';
import { PropsWithChildren, useContext } from 'react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalProvider>
            <WithRoqProvider>
                <Component {...pageProps} />
            </WithRoqProvider>
        </GlobalProvider>
    );
}

export const WithRoqProvider = ({ children }: PropsWithChildren) => {
    const { state } = useContext(GlobalContext)

    return (
        <RoqProvider
            config={{
                host: clientConfig.roq.platformURL,
                auth: {
                    useRoqAuth: true,
                },
            }}
            theme={state?.theme}
        >
            <ChatProvider>
                {children}
            </ChatProvider>
        </RoqProvider>
    )
}
