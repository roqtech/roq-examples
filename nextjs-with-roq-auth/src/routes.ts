export const routes = Object.freeze({
  frontend: {
    authentication: {
      home: "/authentication",
      simple: "/authentication/simple",
      registerWithMetadata: "/authentication/register-with-metadata",
      saveUserOnLogin: "/authentication/save-user-on-login",
    },
    userManagement: {
      createUser: "/users/create-user-programmatically",
    },
    invites: {
      home: "/invites",
      table: "/invites/table",
      pane: "/invites/pane",
    },
    ui: {
      home: "/ui",
      custom: "/ui/custom-theme",
    },
    notifications: {
      home: "/notifications",
      simple: "/notifications/simple",
      customTab: "/notifications/change-default-tab",
      customIcons: "/notifications/custom-icons",
      welcome: "/notifications/welcome",
    },
    chat: {
      home: "/chat",
      simple: "/chat/simple",
      controlled: "/chat/custom",
      messageBell: "/chat/message-bell",
      customIcon: "/chat/custom-icon",
    },
    files: {
      home: "/files",
      upload: "/files/upload",
      controlledUpload: "/files/controlled-upload",
      dropdzone: "/files/dropzone",
      serverSide: "/files/server-side",
    },
  },
  server: {
    files: "/api/files",
    welcome: "/api/welcome",
    staticFileUpload: "/api/files/upload-static-file",
    userManagement: {
      createUser: "/api/users",
    },
  },
});
