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
              {status === 'unauthenticated' && <li><button className="btn btn-sm" onClick={signIn}>Sign in</button></li>}
            </ul>
          </nav>
        </header>

        <section className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <nav className={styles.sidebarNavigation}>
                <ul>

                  <li>
                    <Link href="/">User management</Link>
                    <ul>
                      <li><Link href="/authentication/simple">Simple authentication</Link></li>
                      <li><Link href="/authentication/register-with-metadata">Register with metadata</Link></li>
                      <li><Link href="/authentication/register-with-metadata">Save user on login</Link></li>
                      <li><Link href="/invites/table">Invite users table</Link></li>
                      <li><Link href="/invites/pane">Invite users with  pane in page</Link></li>
                    </ul>
                  </li>
                  <li><Link href="/">UI</Link>
                    <ul>
                      <li><Link href="/ui/custom-theme">Custom theme</Link></li>
                    </ul>
                  </li>
                  <li><Link href="/">Notifications</Link>
                    <ul>
                      <li><Link href="/notifications/simple">Simple notification bell</Link></li>
                      <li><Link href="/notifications/change-default-tab">Notification show unread tab</Link></li>
                      <li><Link href="/notifications/custom-icons">Notifications custom icons</Link></li>
                    </ul>
                  </li>
                  <li><Link href="/chat">Chat</Link></li>
                  <li><Link href="/">Files</Link>
                    <ul>
                      <li><Link href="/files/upload">File Upload</Link></li>
                      <li><Link href="/files/controlled-upload">File Upload (Controlled)</Link>
                      </li>
                      <li><Link href="/files/dropzone">File Dropzone</Link></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          <section className={styles.content}>
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
          </section>
        </section>
      </div >
    </>
  );
}
