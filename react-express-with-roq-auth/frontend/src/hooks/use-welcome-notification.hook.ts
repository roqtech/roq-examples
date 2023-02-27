import { useState } from "react";
import { routes } from "routes";

const useWelcomeNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const welcome = async () => {
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch(routes.server.welcome, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { welcome, isLoading, success };
};

export default useWelcomeNotification;
