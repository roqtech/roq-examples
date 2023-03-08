import React, { PropsWithChildren, useContext } from 'react';
import './App.css';
import '@roq/ui-react/dist/index.css';
import { ChatProvider, RoqProvider } from '@roq/ui-react';
import { clientConfig } from 'config';
import { GlobalProvider } from 'providers';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { GlobalContext } from './context';

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <WithRoqProvider>
                    <RouterProvider router={router}/>
                </WithRoqProvider>
            </div>
        </GlobalProvider>
    );
}


export const WithRoqProvider = ({ children }: PropsWithChildren) => {
    const { state } = useContext(GlobalContext);
    return (
        <RoqProvider
            config={{
                host: clientConfig.roq.platformURL,
                socket: true,
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
    );
}
export default App;
