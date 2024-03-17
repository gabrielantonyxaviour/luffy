"use client";

import { PropsWithChildren } from "react";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const DynamicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
      chainId: 421614,
      chainName: "Arbitrum Sepolia",
      iconUrls: ["https://luffy-eight.vercel.app/sponsors/5.png"],
      name: "Arbitrum Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 421614,
      rpcUrls: [process.env.NEXT_PUBLIC_ARB_SEPOLIA_URL || ""],
      vanityName: "Arb Sepolia",
    },
    {
      blockExplorerUrls: ["https://testnet.chiliscan.com/"],
      chainId: 88882,
      chainName: "Chiliz Spicy",
      iconUrls: ["https://luffy-eight.vercel.app/coins/chz.png"],
      name: "Chiliz Spicy",
      nativeCurrency: {
        decimals: 18,
        name: "Chiliz",
        symbol: "CHZ",
      },
      networkId: 88882,
      rpcUrls: [process.env.NEXT_PUBLIC_CHILIZ_URL || ""],
      vanityName: "Chiliz Spicy",
    },
    {
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
      chainId: 11155111,
      chainName: "Ethereum Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
      name: "Ethereum",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 11155111,
      rpcUrls: [process.env.NEXT_PUBLIC_SEPOLIA_URL || ""],
      vanityName: "ETH Sepolia",
    },
  ];
  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: "https://luffy-eight.vercel.app/logo.png",
        evmNetworks,
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
        appName: "Luffy",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
