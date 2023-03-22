import { clientConfig } from 'config';
import { useEffect, useState } from 'react';

function Login() {
  const [loginUrl, setLoginUrl] = useState(null);
  const serverUrl = clientConfig.roq.serverUrl;

  useEffect(() => {
    fetch(`${serverUrl}/auth/login`)
        .then((res) => res.text())
        .then((data) => {
          console.log({ data });
          setLoginUrl(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loginUrl ? (
        <iframe
          width="100%"
          height="100%"
          title="Login Form"
          dangerouslySetInnerHTML={{
            __html: loginUrl,
          }}
        />
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
}

export default Login;
