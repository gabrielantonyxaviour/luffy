'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { GeneralContext, GeneralContextType } from './GeneralContext';

const { Provider } = GeneralContext;

export const GeneralProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ens, setEns] = useState('');
  const [squadSubmitted, setSquadSubmitted] = useState(false);

  const providerValue: GeneralContextType = {
    ens,
    setEns,
    squadSubmitted,
    setSquadSubmitted
  };

  return <Provider value={providerValue}>{children}</Provider>;
};
