import React from "react";
import { signIn } from "@roq/ui-react";

export const SimpleLogin = () => {
  return (
    <button className="btn btn-sm" onClick={signIn}>
      Sign in with ROQ
    </button>
  );
};

export default SimpleLogin;
