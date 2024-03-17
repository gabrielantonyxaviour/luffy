"use client";

import { createContext, useContext } from "react";

export type GeneralContextType = {
  ens: string;
  setEns: (ens: string) => void;
  squadGenerated: boolean;
  setSquadGenerated: (submitted: boolean) => void;
  logs: string[];
  addLog: (log: string) => void;
  chzBalance: string;
  setChzBalance: (balance: string) => void;
  apeBalance: string;
  setApeBalance: (balance: string) => void;
  nullifierHash: string;
  setNullifierHash: (hash: string) => void;
};

const defaultValue: GeneralContextType = {
  ens: "",
  setEns: () => {},
  squadGenerated: false,
  setSquadGenerated: () => {},
  logs: [],
  addLog: () => {},
  chzBalance: "0",
  setChzBalance: () => {},
  apeBalance: "0",
  setApeBalance: () => {},
  nullifierHash: "",
  setNullifierHash: () => {},
};

export const GeneralContext = createContext<GeneralContextType>(defaultValue);
export const useGeneralContext = () => useContext(GeneralContext);
