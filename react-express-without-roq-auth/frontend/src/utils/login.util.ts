export interface LoginParamsInterface {
    syncDb?: boolean;
    email: string,
    password: string,
}

export const login = async (params?: LoginParamsInterface) => {

    await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'content-type': 'application/json' }
    })
        .then((res) => window.location.reload()).catch(console.error)

};
