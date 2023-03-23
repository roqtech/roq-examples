import { ReactNode, useCallback } from 'react';
import Head from 'next/head';
import styles from 'layout/app/app.layout.module.css';
import Image from 'next/image';
import { ChatMessageBell, NotificationBell, UserAccountDropdown, useSession, } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { routes } from 'routes';

import Link from 'next/link';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

interface SidebarLinkInterface {
  link: string;
  label: ReactNode;
  links?: SidebarLinkInterface[];
  active?: boolean;
}

export default function AppLayout({
  children,
  title,
  description,
}: AppLayoutProps) {
  const router = useRouter();
  const { session, status } = useSession();
  {
    /*

  */
  }

  const isRouteActive = useCallback(
    (route: string) => router.asPath.startsWith(route),
    [router.asPath]
  );

  return (
    <>
      <Head>
        <title>ROQ Next.js Kickstarter</title>
        <meta name="description" content="ROQ Kickstarter with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app}>
        <section className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <Link href={"/"} role="presentation" className={styles.brand}>
                <Image
                  src="/brand.svg"
                  alt="ROQ Logo"
                  width={80}
                  height={40}
                  priority
                />
              </Link>
            </div>
            <div className={styles.sidebarContent}>
              <nav className={styles.sidebarNavigation}>
                <ul>
                  <li>
                    <span>User management</span>
                    <ul>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.authentication.simple)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.authentication.simple}
                        >
                          Simple authentication
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(
                              routes.frontend.authentication
                                .registerWithMetadata
                            )
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={
                            routes.frontend.authentication.registerWithMetadata
                          }
                        >
                          Register with metadata
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(
                              routes.frontend.authentication.saveUserOnLogin
                            )
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.authentication.saveUserOnLogin}
                        >
                          Save user on login
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(
                              routes.frontend.userManagement.createUser
                            )
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.userManagement.createUser}
                        >
                          Create user programmatically
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>UI</span>
                    <ul>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.ui.custom)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.ui.custom}
                        >
                          Custom theme
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Invites</span>
                    <ul>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.invites.table)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.invites.table}
                        >
                          Invite users table
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.invites.pane)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.invites.pane}
                        >
                          Invite users with pane in page
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Notifications</span>
                    <ul>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.notifications.simple)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.notifications.simple}
                        >
                          Simple notification bell
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(
                              routes.frontend.notifications.customTab
                            )
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.notifications.customTab}
                        >
                          Notification show unread tab
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(
                              routes.frontend.notifications.customIcons
                            )
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.notifications.customIcons}
                        >
                          Notifications custom icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.notifications.welcome)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.notifications.welcome}
                        >
                          Welcome a user
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Chat</span>
                    <ul>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.chat.simple)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.chat.simple}
                        >
                          Simple Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.chat.controlled)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.chat.controlled}
                        >
                          Controlled Chat
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.chat.messageBell)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.chat.messageBell}
                        >
                          Chat Message Bell
                        </Link>
                      </li>
                      <li>
                        <Link
                            className={
                              isRouteActive(routes.frontend.chat.customIcon)
                                  ? styles.sidebarNavigationLinkActive
                                  : ''
                            }
                            href={routes.frontend.chat.customIcon}
                        >
                          Custom Icon
                        </Link>
                      </li>
                      <li>
                        <Link
                            className={
                              isRouteActive(routes.frontend.chat.withCallBacks)
                                  ? styles.sidebarNavigationLinkActive
                                  : ''
                            }
                            href={routes.frontend.chat.withCallBacks}
                        >
                          Chat (with Callbacks)
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Files</span>
                    <ul>
                      <li>
                        <Link
                          className={
                            isRouteActive(routes.frontend.files.upload)
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.files.upload}
                        >
                          File Upload
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            isRouteActive(
                              routes.frontend.files.controlledUpload
                            )
                              ? styles.sidebarNavigationLinkActive
                              : ""
                          }
                          href={routes.frontend.files.controlledUpload}
                        >
                          File Upload (Controlled)
                        </Link>
                      </li>
                      <li>
                        <Link
                            className={
                              isRouteActive(routes.frontend.files.dropdzone)
                                  ? styles.sidebarNavigationLinkActive
                                  : ''
                            }
                            href={routes.frontend.files.dropdzone}
                        >
                          File Dropzone
                        </Link>
                      </li>
                      <li>
                        <Link
                            className={
                              isRouteActive(routes.frontend.files.dropdzoneWithCallbacks)
                                  ? styles.sidebarNavigationLinkActive
                                  : ''
                            }
                            href={routes.frontend.files.dropdzoneWithCallbacks}
                        >
                          File Dropzone (With Callbacks)
                        </Link>
                      </li>
                      <li>
                        <Link
                            className={
                              isRouteActive(routes.frontend.files.serverSide)
                                  ? styles.sidebarNavigationLinkActive
                                  : ''
                            }
                            href={routes.frontend.files.serverSide}
                        >
                          Server Side File Upload
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            {status === "authenticated" && (
              <div className={styles.sidebarFooter}>
                <p className={styles.userEmail}>
                  👋 Hello {session?.user?.email}
                </p>
              </div>
            )}
          </aside>

          {/*  */}
          <section className={styles.content}>
            <nav className={styles.globalNavigation}>
              <ul className={styles.globalNavigationList}>
                {status === "authenticated" && (
                  <>
                    <li>
                      <NotificationBell />
                    </li>
                    <li>
                      <ChatMessageBell onClick={() => router.push("/chat")} />
                    </li>
                    <li>
                      <UserAccountDropdown />
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <main id="main" className={styles.main}>
              {!!title && (
                <section className={styles.pageHeader}>
                  {title && <h2 className={styles.pageTitle}>{title}</h2>}
                  {description && (
                    <p className={styles.pageDescription}>{description}</p>
                  )}
                </section>
              )}
              <div className={styles.page}>{children}</div>
            </main>
            <footer className={styles.footer}></footer>
          </section>
          {/*  */}
        </section>
      </div>
    </>
  );
}
