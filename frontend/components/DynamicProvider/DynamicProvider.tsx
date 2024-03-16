'use client';

import { PropsWithChildren } from 'react';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

export const DynamicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [EthereumWalletConnectors]
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
