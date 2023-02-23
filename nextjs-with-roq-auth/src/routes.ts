export const routes = Object.freeze({
  frontend: {
    authentication: {
      home: "/authentication",
      simple: "/authentication/simple",
      registerWithMetadata: "/authentication/register-with-metadata",
      saveUserOnLogin: "/authentication/save-user-on-login",
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
    },
    chat: {
      home: "/chat",
    },
    files: {
      home: "/files",
      upload: "/files/upload",
      controlledUpload: "/files/controlled-upload",
      dropdzone: "/files/dropzone",
    },
  },
  server: {
    files: "/api/files",
    contact: "/api/contact",
  },
});
