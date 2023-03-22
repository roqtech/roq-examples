import React, { useState } from 'react';
import { login } from 'utils/login.util';
import { signup } from 'utils/signup.util';
import styles from './AuthForm.module.css';

export interface SignInFormProps {
    onSubmit: (credentials: Credentials) => void;
}

export interface SignUpFormProps {
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
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        try {
            event.preventDefault();
            await login({
                email: signInCredentials.email,
                password: signInCredentials.password,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const signUpPayload = {
                email: signUpCredentials.email,
                password: signUpCredentials.password,
                name: signUpCredentials.name,
                ...(metaData ? { customData: metaData } : {}),
            };
            await signup(signUpPayload);
        } finally {
            setIsSubmitting(false);
        }
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
                        <button type="submit" className={styles.button} disabled={isSubmitting}>Sign in</button>
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
                        <button type="submit" className={styles.button} disabled={isSubmitting}>Sign up</button>
                    </form>
                )
            }
        </>
    );
}
