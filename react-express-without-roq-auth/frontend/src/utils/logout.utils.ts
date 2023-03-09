export const logout = async () => {

    await fetch('/api/auth/logout')
        .then((res) => window.location.reload()).catch(console.error);
}
