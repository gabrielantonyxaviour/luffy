'use client';

import { createContext, useContext } from 'react';

export type GeneralContextType = {
  ens: string;
  setEns: (ens: string) => void;
};

const defaultValue: GeneralContextType = {
  ens: '',
  setEns: () => {}
};

export const GeneralContext = createContext<GeneralContextType>(defaultValue);
export const useGeneralContext = () => useContext(GeneralContext);
