import React from "react";
import AuthLayout from "layout/auth/auth.layout";
import DemoLayout from "layout/demo/demo.layout";
import AppLayout from "layout/app/app.layout";
import { signIn } from "@roq/nextjs";

export const SimpleLogin = () => {
  return (
    <AppLayout
      title="Authentication"
      description="Simple authentication. User data will not be synced with database."
    >
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <button className="btn btn-sm" onClick={() => signIn()}>
            Sign in with ROQ auth
          </button>
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default SimpleLogin;
