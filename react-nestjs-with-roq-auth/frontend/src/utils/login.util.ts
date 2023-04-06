import { clientConfig } from '../config';

export interface LoginParamsInterface {
    syncDb?: boolean;
}

export const login = async (params?: LoginParamsInterface) => {
    const loginUrl = new URL(
        clientConfig.roq.serverUrl + '/api/auth/login'
    );

    if (params?.syncDb) {
        loginUrl.searchParams.set('sync', 't');
    }

    await fetch(loginUrl.toString())
        .then((res) => res.text())

    if (typeof window !== 'undefined') {
        window.location.href = loginUrl.toString();
    }
};
