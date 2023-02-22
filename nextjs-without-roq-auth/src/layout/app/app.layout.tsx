/*
  This component showcases the NotificationBell, and ChatMessageBell from ROQ
*/

import { ReactNode, useCallback, useMemo } from 'react';
import Head from 'next/head';
import styles from 'layout/app/app.layout.module.css';
import Image from 'next/image';
import { ChatMessageBell, NotificationBell, signOut } from '@roq/nextjs';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

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
    const { status } = useSession();
    const isLinkActive = useCallback((link: SidebarLinkInterface['link']) => link === router.asPath, [])

    const navigation = useMemo(() => ([
        {
            link: '/', label: '+', links: [
                { link: '/authentication/simple', label: '+' },
                { link: '/authentication/register-with-metadata', label: '+' },
                { link: '/authentication/save-user-on-login', label: '+' },
            ]
        },
        {
            link: '/invites', label: '+', links: [
                { link: '/invites/table', label: '+' },
                { link: '/invites/pane', label: '+' },
            ]
        },

        {
            link: '/ui', label: '+', links: [
                { link: '/ui/custom-theme', label: '+' },
            ]
        },
        {
            link: '/', label: '+', links: [
                { link: '/notifications/simple', label: '+' },
                { link: '/notifications/change-default-tab', label: '+' },
                { link: '/notifications/custom-icons', label: '+' },
            ]
        },

    ]).map((item) => ({
        ...item,
        active: isLinkActive(item.link)
    })), [isLinkActive])

    const renderNavigation = (nav: SidebarLinkInterface) => <li><Link href="/">User management</Link></li>
    const isAuthenticated = useMemo(() => status === 'authenticated', [status]);
    return (
        <>
            <Head>
                <title>ROQ Next.js Kickstarter</title>
                <meta name="description" content="ROQ Kickstarter with Next.js"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.app}>
                <header className={styles.header}>
                    <Link href={'/'} role="presentation" className={styles.brand}>
                        <Image
                            src="/roq.svg"
                            alt="ROQ Logo"
                            width={80}
                            height={40}
                            priority
                        />
                    </Link>
                    <nav className={styles.globalNavigation}>
                        <ul className={styles.globalNavigationList}>
                            {
                                isAuthenticated && (
                                    <>
                                        <li><NotificationBell/></li>
                                        <li><ChatMessageBell onClick={() => router.push('/chat')}/></li>
                                    </>
                                )
                            }
                            <li>
                                {
                                    isAuthenticated && (
                                        <button className="btn btn-sm" onClick={signOut}>Logout</button>
                                    )
                                }
                                {
                                    !isAuthenticated && (
                                        <button className="btn btn-sm"
                                                onClick={() => router.push('/authentication/simple')}>Login</button>
                                    )
                                }
                            </li>
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
                                            <li><Link href="/authentication/register-with-metadata">Register with
                                                metadata</Link></li>
                                            <li><Link
                                                href="/authentication/save-user-on-login">Save User on Log In</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link href="/">Invites</Link>
                                        <ul>
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
                                            <li><Link href="/notifications/change-default-tab">Notification show unread
                                                tab</Link></li>
                                            <li><Link href="/notifications/custom-icons">Notifications custom
                                                icons</Link></li>
                                            <li><Link href="/notifications/welcome-a-user">Welcome a user</Link></li>
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
            </div>
        </>
    );
}
