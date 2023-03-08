import React from 'react';
import { ChatMessageBell, NotificationBell, signIn, signOut, useSession } from '@roq/ui-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import DemoLayout from './demo.layout';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useSession();
  return (
      <div className="app">
        <header className="header">
          <Link to={'/'} role="presentation" className="brand">
            <img src="/brand.svg" alt="ROQ Logo" width={80} height={40}/>
          </Link>
          <nav className="globalNavigation">
            <ul className="globalNavigationList">
              <li>
                <NotificationBell/>
              </li>
              <li>
                <ChatMessageBell onClick={() => navigate('/chat')}/>
              </li>
              {status === 'authenticated' && (
                  <li>
                    <button className="btn btn-sm" onClick={signOut}>
                      Logout
                    </button>
                  </li>
              )}
              {status === 'unauthenticated' && (
                  <li>
                    <button className="btn btn-sm" onClick={signIn}>
                      Sign in
                    </button>
                  </li>
              )}
            </ul>
          </nav>
        </header>
        <section className="container">
          <aside className="sidebar">
            <div className="sidebarContent">
              <nav className="sidebarNavigation">
                <ul>
                  <li>
                    <Link to={routes.frontend.authentication.home}>
                      User management
                    </Link>
                    <ul>
                      <li>
                        <Link to={routes.frontend.authentication.simple}>
                          Simple authentication
                        </Link>
                      </li>
                      <li>
                        <Link
                            to={
                              routes.frontend.authentication
                                  .registerWithMetadata
                            }
                        >
                          Register with metadata
                        </Link>
                      </li>
                      <li>
                        <Link
                            to={routes.frontend.authentication.saveUserOnLogin}
                        >
                          Save user on login
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={routes.frontend.invites.home}>Invites</Link>
                    <ul>
                      <li>
                        <Link to={routes.frontend.invites.table}>
                          Invite users table
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.invites.pane}>
                          Invite users with pane in page
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={routes.frontend.ui.home}>UI</Link>
                    <ul>
                      <li>
                        <Link to={routes.frontend.ui.custom}>
                          Custom theme
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={routes.frontend.notifications.home}>
                      Notifications
                    </Link>
                    <ul>
                      <li>
                        <Link to={routes.frontend.notifications.simple}>
                          Simple notification bell
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.notifications.customTab}>
                          Notification show unread tab
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.notifications.customIcons}>
                          Notifications custom icons
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.notifications.welcome}>
                          Welcome a user
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={routes.frontend.chat.home}>Chat</Link>
                    <ul>
                      <li>
                        <Link to={routes.frontend.chat.simple}>
                          Simple Chat
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.chat.controlled}>
                          Controlled Chat
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.chat.messageBell}>
                          Chat Message Bell
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.chat.customIcon}>
                          Custom Icon
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to={routes.frontend.files.home}>Files</Link>
                    <ul>
                      <li>
                        <Link to={routes.frontend.files.upload}>
                          File Upload
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.files.controlledUpload}>
                          File Upload (Controlled)
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.files.dropdzone}>
                          File Dropzone
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.frontend.files.serverSide}>
                          Server Side File Upload
                        </Link></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          <section className="content">
            <div>
              <main id="main" className="main">
                <div>
                  <DemoLayout
                      requireSession={!location.pathname.includes('authentication')}
                  >
                    <Outlet/>
                  </DemoLayout>
                </div>
                <div style={{ clear: 'both' }}></div>
              </main>
              <footer className="footer"></footer>
            </div>
          </section>
        </section>
      </div>
  );
}

export default AppLayout;
