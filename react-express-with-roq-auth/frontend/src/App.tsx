import React from "react";
import "./App.css";
import "@roq/ui-react/dist/index.css";
import { RouterProvider } from "react-router-dom";
import router from "router";
import { RoqProvider, ChatProvider } from "@roq/ui-react";
import { roqThemeLight } from "styles/roq-theme";
import { clientConfig } from "config";

function App() {
  return (
    <div className="App">
      <RoqProvider
        config={{
          host: clientConfig.roq.platformURL,
          socket: true,
          auth: {
            useRoqAuth: true,
            loginURL: clientConfig.roq.serverUrl + "/auth/login",
            signupURL: clientConfig.roq.serverUrl + "/auth/signup",
            callbackURL: clientConfig.roq.serverUrl + "/auth/callback",
            sessionURL: clientConfig.roq.serverUrl + "/auth/session",
            logoutURL: clientConfig.roq.serverUrl + "/auth/logout",
          },
        }}
        theme={roqThemeLight}
      >
        <ChatProvider>
          <RouterProvider router={router} />
        </ChatProvider>
      </RoqProvider>
    </div>
  );
}

export default App;
