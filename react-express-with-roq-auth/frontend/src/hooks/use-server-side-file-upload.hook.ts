import { useState } from 'react';

const useServerSideFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const initiateUpload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/files/upload-static-file`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setResponse(await response.json());
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { initiateUpload, isLoading, response };
};

export default useServerSideFileUpload;
