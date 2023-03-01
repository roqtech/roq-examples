import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './AuthForm.module.css';

interface SignInFormProps {
    onSubmit: (credentials: Credentials) => void;
}

interface SignUpFormProps {
    onSubmit: (credentials: Credentials & { name: string }) => void;
}

interface Credentials {
    email: string;
    password: string;
}

export interface AuthFormPropsInterface {
    type: 'signIn' | 'signUp',
    metaData?: Record<string, unknown>
}

export function AuthForm({ type, metaData }: AuthFormPropsInterface) {
    const [signInCredentials, setSignInCredentials] = useState<Credentials>({
        email: '',
        password: '',
    });

    const [signUpCredentials, setSignUpCredentials] = useState<
        Credentials & { name: string }
    >({
        email: '',
        password: '',
        name: '',
    });

    const handleSignInInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSignInCredentials({
            ...signInCredentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignUpInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSignUpCredentials({
            ...signUpCredentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signIn('credentials', {
            email: signInCredentials.email,
            password: signInCredentials.password,
        });
    };

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signIn('credentials', {
            email: signUpCredentials.email,
            password: signUpCredentials.password,
            name: signUpCredentials.name,
            ...(metaData ? { metadata: JSON.stringify(metaData) } : {}),
        }, 'signUp=true');
    };

    return (
        <>
            {
                type === 'signIn' && (
                    <form className={styles.form} onSubmit={handleSignInSubmit}>
                        <h1 className={styles.heading}>Sign in</h1>
                        <label className={styles.label}>
                            Email
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                value={signInCredentials.email}
                                onChange={handleSignInInputChange}
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Password
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                value={signInCredentials.password}
                                onChange={handleSignInInputChange}
                                required
                            />
                        </label>
                        <button type="submit" className={styles.button}>Sign in</button>
                    </form>

                )
            }
            {
                type === 'signUp' && (
                    <form className={styles.form} onSubmit={handleSignUpSubmit}>
                        <h1 className={styles.heading}>Sign up</h1>
                        <label className={styles.label}>
                            Name
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                value={signUpCredentials.name}
                                onChange={handleSignUpInputChange}
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Email
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                value={signUpCredentials.email}
                                onChange={handleSignUpInputChange}
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Password
                            <input
                                className={styles.input}
                                type="password"
                                name="password"
                                value={signUpCredentials.password}
                                onChange={handleSignUpInputChange}
                                required
                            />
                        </label>
                        <button type="submit" className={styles.button}>Sign up</button>
                    </form>
                )
            }
        </>
    );
}
