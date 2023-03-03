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
      customTable: '/invites/custom-table',
      customPane: '/invites/custom-pane',
    },
    notifications: {
      home: "/notifications",
      simple: "/notifications/simple",
      customTab: "/notifications/change-default-tab",
      customIcons: "/notifications/custom-icons",
      welcome: "/notifications/welcome",
      custom: '/notifications/custom-notifications'
    },
    chat: {
      home: "/chat",
      simple: "/chat/simple",
      custom: "/chat/custom-chat",
      controlled: "/chat/custom",
      messageBell: "/chat/message-bell",
      customIcon: "/chat/custom-icon",
    },
    files: {
      home: '/files',
      upload: '/files/upload',
      customUpload: '/files/custom-upload',
      controlledUpload: '/files/controlled-upload',
      dropzone: '/files/dropzone',
      customDropzone: '/files/custom-dropzone',
    },
  },
  server: {
    files: "/api/files",
    welcome: "/api/welcome",
  },
});
