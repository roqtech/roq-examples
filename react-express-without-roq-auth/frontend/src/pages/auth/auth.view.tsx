import styles from 'pages/auth/auth.module.css';
import { AuthForm, AuthFormPropsInterface } from '../../components/auth-form';
import React, { useMemo, useState } from 'react';
import { useSession } from '@roq/ui-react';
import { logout } from '../../utils/logout.utils';
import clsx from 'clsx';

export const AuthView = (props: Omit<AuthFormPropsInterface, 'type'>) => {
    const [formType, setFormType] = useState<'signUp' | 'signIn'>();
    const { status } = useSession();
    const isAuthenticated = useMemo(() => status === 'authenticated', [status]);
    return (
        <>
            <div className={styles.center}>
                <div className={styles.container}>
                    <img
                        className={styles.logo}
                        src="/brand-big.svg"
                        alt="ROQ Logo"
                        width={300}
                        height={200}
                    />
                    {
                        isAuthenticated && (
                            <button className="btn btn-block" onClick={() => logout()}>
                                Log Out
                            </button>
                        )
                    }
                    {
                        !isAuthenticated && (
                            <>
                                {
                                    !formType && (
                                        <>
                                            <button className="btn btn-block" onClick={() => setFormType('signUp')}>
                                                Register
                                            </button>
                                            <button className={clsx('btn', styles.button)}
                                                    onClick={() => setFormType('signIn')}>
                                                Login
                                            </button>
                                        </>
                                    )
                                }
                                {
                                    formType && (
                                        <>
                                            <AuthForm {...props} type={formType}/>
                                            <div className={styles.back} onClick={() => setFormType(undefined)}>
                                                <span>Back</span>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                    <a
                        href="https://docs.roq.tech"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2>Docs</h2>
                        <div>https://docs.roq.tech</div>
                    </a>
                </div>
            </div>
        </>
    )
}
