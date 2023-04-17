import AuthLayout from "layout/auth/auth.layout";
import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";
import { useCallback } from "react";
import { signUp } from '@roq/nextjs'
import styles from 'pages/authentication/form-variant/form-variant.module.css';
import { routes } from "routes";

const AuthenticationFormVariant = () => {
  const handleAdminAuth = useCallback(() => {
    signUp('default', { postLoginRedirect: `${routes.frontend.authentication.formVariant}` })
  }, [])

  const handleMemberAuth = useCallback(() => {
    signUp('member-form', { postLoginRedirect: `${routes.frontend.authentication.formVariant}?role=buyer` })
  }, [])

  return (
    <AppLayout>
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <div className={styles.container}>
            <button className="btn btn-sm" onClick={handleAdminAuth}>
              Sign Up with ROQ as Admin
            </button>
            <button className="btn btn-sm" onClick={handleMemberAuth}>
              Sign Up with ROQ as Member
            </button>
          </div>
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default AuthenticationFormVariant;
