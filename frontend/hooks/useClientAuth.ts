import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export const useClientAuth = () => {
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated } = useDynamicContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isAuthenticated: isClient && isAuthenticated
  };
};
