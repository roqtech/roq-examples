import { useCallback } from "react";
import { signup } from "utils/signup.util";

const RegisterWithMetadata = () => {
  const handleSignup = useCallback(
    () =>
      signup({
        isBuyer: true,
      }),
    []
  );

  return (
    <button className="btn btn-sm" onClick={handleSignup}>
      Sign Up with ROQ as Buyer
    </button>
  );
};

export default RegisterWithMetadata;
