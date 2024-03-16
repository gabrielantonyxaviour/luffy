'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { GeneralContext, GeneralContextType } from './GeneralContext';

const { Provider } = GeneralContext;

export const GeneralProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ens, setEns] = useState('');

  const providerValue: GeneralContextType = {
    ens,
    setEns
  };

  return <Provider value={providerValue}>{children}</Provider>;
};
