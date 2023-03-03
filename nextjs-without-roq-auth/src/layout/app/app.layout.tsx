import { ReactNode, useCallback } from 'react';
import Head from 'next/head';
import styles from 'layout/app/app.layout.module.css';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
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

export default function AppLayout({ children, title, description }: AppLayoutProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isRouteActive = useCallback((route: string) => router.asPath.startsWith(route), [router.asPath])

  return (
      <>
        <Head>
          <title>ROQ Next.js Kickstarter</title>
          <meta name="description" content="ROQ Kickstarter with Next.js"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className={styles.app}>
          <section className={styles.container}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <Link href={'/'} role="presentation" className={styles.brand}>
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
                        <li><Link
                            className={isRouteActive(routes.frontend.authentication.simple) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.authentication.simple}>Simple authentication</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.authentication.registerWithMetadata) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.authentication.registerWithMetadata}>Register with metadata</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Invites</span>
                      <ul>
                        <li><Link
                            className={isRouteActive(routes.frontend.invites.table) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.invites.table}>Invite users table</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.invites.customTable) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.invites.customTable}>Invite users table (Custom Theme)</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.invites.pane) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.invites.pane}>Invite users with pane</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.invites.customPane) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.invites.customPane}>Invite users with pane (Custom Theme)</Link></li>
                      </ul>
                    </li>
                    <li>
                      <span>Notifications</span>
                      <ul>
                        <li><Link
                            className={isRouteActive(routes.frontend.notifications.simple) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.notifications.simple}>Simple notification bell</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.notifications.customTab) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.notifications.customTab}>Notification show unread tab</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.notifications.customIcons) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.notifications.customIcons}>Notifications custom icons</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.notifications.custom) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.notifications.custom}>Notification (Custom Theme)</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.notifications.welcome) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.notifications.welcome}>Welcome a user</Link></li>
                      </ul>
                    </li>
                    <li>
                      <span>Chat</span>
                      <ul>
                        <li><Link
                            className={isRouteActive(routes.frontend.chat.simple) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.chat.simple}>Simple Chat</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.chat.controlled) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.chat.controlled}>Controlled Chat</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.chat.messageBell) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.chat.messageBell}>Chat Message Bell</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.chat.customIcon) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.chat.customIcon}>Custom Icon</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.chat.custom) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.chat.custom}>Chat (Custom Theme)</Link></li>
                      </ul>
                    </li>
                    <li>
                      <span>Files</span>
                      <ul>
                        <li><Link
                            className={isRouteActive(routes.frontend.files.upload) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.files.upload}>File Upload</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.files.controlledUpload) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.files.controlledUpload}>File Upload (Controlled)</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.files.customUpload) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.files.customUpload}>File Upload (Custom Theme)</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.files.dropzone) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.files.dropzone}>File Dropzone</Link></li>
                        <li><Link
                            className={isRouteActive(routes.frontend.files.customDropzone) ? styles.sidebarNavigationLinkActive : ''}
                            href={routes.frontend.files.customDropzone}>File Dropzone (Custom Theme)</Link></li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              {status === 'authenticated' && <div className={styles.sidebarFooter}>
                <p className={styles.userEmail}>👋 Hello {session?.user?.email}</p>
                <button className="btn btn-sm" onClick={() => signOut()}>Logout</button>
              </div>}
            </aside>

            {/*  */}
            <section className={styles.content}>
              <main id="main" className={styles.main}>
                {!!title && (
                    <section className={styles.pageHeader}>
                      {title && <h2 className={styles.pageTitle}>{title}</h2>}
                      {description && <p className={styles.pageDescription}>{description}</p>}
                    </section>
                )}
                <div className={styles.page}>
                  {children}
                </div>
              </main>
              <footer className={styles.footer}></footer>
            </section>
            {/*  */}
          </section>
        </div>
      </>
  );
}
