import { useCallback } from "react";

import { login } from "utils/login.util";

const SaveOnLogin = () => {
  const handleLogin = useCallback(
    () =>
      login({
        syncDb: true,
      }),
    []
  );

  return (
    <button className="btn btn-sm" onClick={handleLogin}>
      Sign in with ROQ and store in db
    </button>
  );
};

export default SaveOnLogin;
