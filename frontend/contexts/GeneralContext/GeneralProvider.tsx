"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { GeneralContext, GeneralContextType } from "./GeneralContext";

const { Provider } = GeneralContext;

export const GeneralProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ens, setEns] = useState("");
  const [squadGenerated, setSquadGenerated] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [chzBalance, setChzBalance] = useState("0");
  const [apeBalance, setApeBalance] = useState("0");

  const addLog = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  const providerValue: GeneralContextType = {
    ens,
    setEns,
    squadGenerated,
    setSquadGenerated,
    logs,
    addLog,
    chzBalance,
    setChzBalance,
    apeBalance,
    setApeBalance,
  };

  return <Provider value={providerValue}>{children}</Provider>;
};
