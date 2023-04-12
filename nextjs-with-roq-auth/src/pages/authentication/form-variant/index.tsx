import AuthLayout from "layout/auth/auth.layout";
import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";
import { useCallback } from "react";
import { signUp } from '@roq/nextjs'
import styles from 'pages/authentication/form-variant/form-variant.module.css';
import { routes } from "routes";

const AuthenticationFormVariant = () => {
  const handleBuyerAuth = useCallback(() => {
    signUp('buyer', { postLoginRedirect: routes.frontend.authentication.formVariant })
  }, [])

  const handleSellerAuth = useCallback(() => {
    signUp('seller', { postLoginRedirect: routes.frontend.authentication.formVariant })
  }, [])

  return (
    <AppLayout>
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <div className={styles.container}>
            <button className="btn btn-sm" onClick={handleBuyerAuth}>
              Sign Up with ROQ as Buyer
            </button>
            <button className="btn btn-sm" onClick={handleSellerAuth}>
              Sign Up with ROQ as Seller
            </button>
          </div>
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default AuthenticationFormVariant;
