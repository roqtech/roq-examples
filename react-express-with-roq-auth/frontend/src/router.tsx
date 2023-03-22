import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from 'pages/dashboard';
import { routes } from 'routes';
import SimpleAuthPage from 'pages/authentication';
import RegisterWithMetadata from 'pages/authentication/register-with-metadata';
import SaveOnLogin from 'pages/authentication/save-user-on-login';
import InvitesTablePage from 'pages/invites';
import InvitePane from 'pages/invites/pane';
import CustomTheme from 'pages/ui/custom-theme';
import SimpleNotificationsPage from 'pages/notifications';
import NotificationUnreadTab from 'pages/notifications/change-default-tab';
import CustomNotificationIcon from 'pages/notifications/custom-icons';
import WelcomeNotification from 'pages/notifications/welcome';
import ChatPage from 'pages/chat/simple';
import ControlledChatPage from 'pages/chat/custom';
import ChatMessageBellPage from 'pages/chat/message-bell';
import ChatCustomMessageBellPage from 'pages/chat/custom-icon';
import FileUploadPage from 'pages/files';
import FileUpload from 'pages/files/controlled-upload';
import FileUploadDropzone from 'pages/files/dropzone';
import FileServerSideUpload from 'pages/files/server-side';
import AppLayout from 'pages/layout';
import Login from 'pages/auth/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <DashboardPage/>,
      },
      {
        path: routes.frontend.authentication.home,
        element: <SimpleAuthPage/>,
      },
      {
        path: routes.frontend.authentication.simple,
        element: <SimpleAuthPage />,
      },
      {
        path: routes.frontend.authentication.registerWithMetadata,
        element: <RegisterWithMetadata />,
      },
      {
        path: routes.frontend.authentication.saveUserOnLogin,
        element: <SaveOnLogin />,
      },
      {
        path: routes.frontend.invites.home,
        element: <InvitesTablePage />,
      },
      {
        path: routes.frontend.invites.table,
        element: <InvitesTablePage />,
      },
      {
        path: routes.frontend.invites.pane,
        element: <InvitePane />,
      },
      {
        path: routes.frontend.ui.home,
        element: <CustomTheme />,
      },
      {
        path: routes.frontend.ui.custom,
        element: <CustomTheme/>,
      },
      {
        path: routes.frontend.notifications.home,
        element: <SimpleNotificationsPage />,
      },
      {
        path: routes.frontend.notifications.simple,
        element: <SimpleNotificationsPage />,
      },
      {
        path: routes.frontend.notifications.customTab,
        element: <NotificationUnreadTab />,
      },
      {
        path: routes.frontend.notifications.customIcons,
        element: <CustomNotificationIcon />,
      },
      {
        path: routes.frontend.notifications.welcome,
        element: <WelcomeNotification />,
      },
      {
        path: routes.frontend.chat.home,
        element: <ChatPage />,
      },
      {
        path: routes.frontend.chat.simple,
        element: <ChatPage />,
      },
      {
        path: routes.frontend.chat.controlled,
        element: <ControlledChatPage />,
      },
      {
        path: routes.frontend.chat.messageBell,
        element: <ChatMessageBellPage />,
      },
      {
        path: routes.frontend.chat.customIcon,
        element: <ChatCustomMessageBellPage />,
      },
      {
        path: routes.frontend.files.home,
        element: <FileUploadPage />,
      },
      {
        path: routes.frontend.files.upload,
        element: <FileUploadPage/>,
      },
      {
        path: routes.frontend.files.controlledUpload,
        element: <FileUpload/>,
      },
      {
        path: routes.frontend.files.dropdzone,
        element: <FileUploadDropzone/>,
      },
      {
        path: routes.frontend.files.serverSide,
        element: <FileServerSideUpload/>,
      }
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
