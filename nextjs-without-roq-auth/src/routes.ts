export const routes = Object.freeze({
  frontend: {
    authentication: {
      home: "/authentication",
      simple: "/authentication/simple",
      registerWithMetadata: "/authentication/register-with-metadata",
    },
    invites: {
      home: '/invites',
      table: '/invites/table',
      pane: '/invites/pane',
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
      controlled: '/chat/custom',
      messageBell: '/chat/message-bell',
      customIcon: '/chat/custom-icon',
    },
    files: {
      home: '/files',
      upload: '/files/upload',
      controlledUpload: '/files/controlled-upload',
      dropzone: '/files/dropzone',
    },
    ui: {
      home: '/ui',
      custom: '/ui/custom-theme',
    },
  },
  server: {
    files: "/api/files",
    welcome: "/api/welcome",
  },
});
