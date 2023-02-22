import styles from 'views/auth/auth.module.css';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { AuthForm } from '../../components/auth-form';
import React, { useMemo, useState } from 'react';

export const AuthView = () => {
    const [formType, setFormType] = useState<'signUp' | 'signIn'>();
    const { status } = useSession();
    const isAuthenticated = useMemo(() => status === 'authenticated', [status]);
    return (
        <>
            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/roq.svg"
                    alt="ROQ Logo"
                    width={300}
                    height={200}
                    priority
                />
                {
                    isAuthenticated && (
                        <button className="btn btn-block" onClick={() => signOut()}>
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
                                        <div onClick={() => setFormType('signIn')}>
                                            <a href="#">Login</a>
                                        </div>
                                    </>
                                )
                            }
                            {
                                formType && (
                                    <>
                                        <AuthForm type={formType}/>
                                        <div className={styles.back} onClick={() => setFormType(undefined)}>
                                            <a href="#">Back</a>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
            <a
                href="https://docs.roq.tech"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2>Docs</h2>
                <div>https://docs.roq.tech</div>
            </a>
        </>
    )
}
