export const routes = Object.freeze({
  frontend: {
    authentication: {
      home: "/authentication",
      simple: "/authentication/simple",
      registerWithMetadata: "/authentication/register-with-metadata",
      saveUserOnLogin: "/authentication/save-user-on-login",
      formVariant: "/authentication/form-variant",
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
      home: '/chat',
      simple: '/chat/simple',
      controlled: '/chat/controlled',
      messageBell: '/chat/message-bell',
      customIcon: '/chat/custom-icon',
      withCallBacks: '/chat/with-callbacks',
      serverSideRequests: '/chat/server-side-requests',
      fetchConversation: '/chat/fetch-conversation'
    },
    files: {
      home: '/files',
      upload: '/files/upload',
      controlledUpload: '/files/controlled-upload',
      dropdzone: '/files/dropzone',
      dropdzoneWithCallbacks: '/files/dropzone-with-callbacks',
      serverSide: '/files/server-side'
    },
    profile: {
      home: '/profile'
    }
  },
  server: {
    files: '/api/files',
    fileAssociations: '/api/files/associations',
    createFileAssociation: '/api/files/create-file-association',
    welcome: '/api/welcome',
    staticFileUpload: '/api/files/upload-static-file',
    userManagement: {
      createUser: '/api/users',
    },
    chat: {
      createPrivateConversation: '/api/chat/create-1-1-conversation',
      createGroupConversation: '/api/chat/create-group-conversation',
      sendSystemMessage: '/api/chat/send-system-message',
      createConversationWithTags: '/api/chat/assign-tags',
      unassignConversationTags: '/api/chat/unassign-conversation-tags',
      deleteConversation: '/api/chat/delete-conversation',
    },
  },
});
