import React, { useState } from "react";
import AuthLayout from "layout/auth/auth.layout";
import AppLayout from "layout/app/app.layout";
import DemoLayout from "layout/demo/demo.layout";
import { routes } from "routes";
import { toast } from "react-hot-toast";
import styles from "./custom-login.module.css";

const CustomLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(routes.server.userManagement.customLogin, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Login Successful");
        window.location.href = "/";
      } else {
        const errorMessage =
          (await response.json())?.error || "Something went wrong!";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <DemoLayout requireSession={false}>
        <AuthLayout>
          <form className={styles.form}>
            <h1 className={styles.heading}>Login</h1>
            <label className={styles.label}>
              <span className={styles.text}>Email</span>
              <input
                value={email}
                className="input w-50"
                type="email"
                disabled={loading}
                placeholder="Email address"
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.text}>Password</span>
              <input
                value={password}
                className="input w-50"
                type="password"
                disabled={loading}
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className={styles.button}
              onClick={handleLogin}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </AuthLayout>
      </DemoLayout>
    </AppLayout>
  );
};

export default CustomLogin;
