'use client';

import { createContext, useContext } from 'react';

export type GeneralContextType = {
  ens: string;
  setEns: (ens: string) => void;
  squadGenerated: boolean;
  setSquadGenerated: (submitted: boolean) => void;
};

const defaultValue: GeneralContextType = {
  ens: '',
  setEns: () => {},
  squadGenerated: false,
  setSquadGenerated: () => {}
};

export const GeneralContext = createContext<GeneralContextType>(defaultValue);
export const useGeneralContext = () => useContext(GeneralContext);
