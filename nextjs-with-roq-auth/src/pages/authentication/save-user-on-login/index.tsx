import { useCallback } from "react";
import AuthLayout from "layout/auth/auth.layout";
import AppLayout from "layout/app/app.layout";
import { login } from "utils/login.util";
import DemoLayout from "layout/demo/demo.layout";

const SaveOnLogin = () => {
  const handleLogin = useCallback(
    () =>
      login({
        syncDb: true,
      }),
    []
  );

  return (
    <AppLayout>
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <button className="btn btn-sm" onClick={handleLogin}>
            Sign in with ROQ and store in db
          </button>
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default SaveOnLogin;
