/*
  This component showcases the NotificationBell, and ChatMessageBell from ROQ 
*/

import { ReactNode, useCallback } from "react";
import Head from "next/head";
import styles from "layout/app/app.layout.module.css";
import Image from "next/image";
import { NotificationBell, ChatMessageBell, signOut, useSession, signIn } from "@roq/nextjs";
import { useRouter } from "next/router";
import { routes } from "routes";

import Link from "next/link";
import { useMemo } from "react";
import { sign } from "crypto";

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
  const { session, status } = useSession();
  {/*

  */}

  const isRouteActive = useCallback((route: string) => router.asPath.startsWith(route), [router.asPath])

  return (
    <>
      <Head>
        <title>ROQ Next.js Kickstarter</title>
        <meta name="description" content="ROQ Kickstarter with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app}>
        <header className={styles.header}>
          <Link href={"/"} role="presentation" className={styles.brand}>
            <Image
              src="/brand.svg"
              alt="ROQ Logo"
              width={80}
              height={40}
              priority
            />
          </Link>
          <nav className={styles.globalNavigation}>
            <ul className={styles.globalNavigationList}>
              <li><NotificationBell /></li>
              <li><ChatMessageBell onClick={() => router.push('/chat')} /></li>
              {status === 'authenticated' && <li><button className="btn btn-sm" onClick={signOut}>Logout</button></li>}
              {/* {status === 'unauthenticated' && <li><button className="btn btn-sm" onClick={signIn}>Sign in</button></li>} */}
            </ul>
          </nav>
        </header>

        <section className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <nav className={styles.sidebarNavigation}>
                <ul>
                  <li>
                    <Link className={isRouteActive(routes.frontend.authentication.home) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.authentication.home}>User management</Link>
                    <ul>
                      <li><Link className={isRouteActive(routes.frontend.authentication.simple) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.authentication.simple}>Simple authentication</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.authentication.registerWithMetadata) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.authentication.registerWithMetadata}>Register with metadata</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.authentication.saveUserOnLogin) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.authentication.saveUserOnLogin}>Save user on login</Link></li>
                    </ul>
                  </li>
                  <li><Link className={isRouteActive(routes.frontend.invites.home) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.invites.home}>Invites</Link>
                    <ul>
                      <li><Link className={isRouteActive(routes.frontend.invites.table) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.invites.table}>Invite users table</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.invites.pane) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.invites.pane}>Invite users with  pane in page</Link></li>
                    </ul>
                  </li>
                  <li><Link className={isRouteActive(routes.frontend.ui.home) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.ui.home}>UI</Link>
                    <ul>
                      <li><Link className={isRouteActive(routes.frontend.ui.custom) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.ui.custom}>Custom theme</Link></li>
                    </ul>
                  </li>
                  <li><Link className={isRouteActive(routes.frontend.notifications.home) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.notifications.home}>Notifications</Link>
                    <ul>
                      <li><Link className={isRouteActive(routes.frontend.notifications.simple) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.notifications.simple}>Simple notification bell</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.notifications.customTab) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.notifications.customTab}>Notification show unread tab</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.notifications.customIcons) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.notifications.customIcons}>Notifications custom icons</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.notifications.welcome) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.notifications.welcome}>Welcome a user</Link></li>
                    </ul>
                  </li>
                  <li><Link className={isRouteActive(routes.frontend.chat.home) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.chat.home}>Chat</Link></li>
                  <li><Link className={isRouteActive(routes.frontend.files.home) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.files.home}>Files</Link>
                    <ul>
                      <li><Link className={isRouteActive(routes.frontend.files.upload) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.files.upload}>File Upload</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.files.controlledUpload) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.files.controlledUpload}>File Upload (Controlled)</Link></li>
                      <li><Link className={isRouteActive(routes.frontend.files.dropdzone) ? styles.sidebarNavigationLinkActive : ''} href={routes.frontend.files.dropdzone}>File Dropzone</Link></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          <section className={styles.content}>
            <div>
              <main id="main" className={styles.main}>
                {!!title && (
                  <section className={styles.pageHeader}>
                    {title && <h2 className={styles.pageTitle}>{title}</h2>}
                    {description && <p className={styles.pageDescription}>{description}</p>}
                  </section>
                )}
                <div>
                  {children}
                </div>
                <div style={{ 'clear': 'both' }}></div>
              </main>
              <footer className={styles.footer}></footer>
            </div>
          </section>
        </section>
      </div >
    </>
  );
}
