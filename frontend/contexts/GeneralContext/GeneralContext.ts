'use client';

import { createContext, useContext } from 'react';

export type GeneralContextType = {
  ens: string;
  setEns: (ens: string) => void;
  squadSubmitted: boolean;
  setSquadSubmitted: (submitted: boolean) => void;
};

const defaultValue: GeneralContextType = {
  ens: '',
  setEns: () => {},
  squadSubmitted: false,
  setSquadSubmitted: () => {}
};

export const GeneralContext = createContext<GeneralContextType>(defaultValue);
export const useGeneralContext = () => useContext(GeneralContext);
