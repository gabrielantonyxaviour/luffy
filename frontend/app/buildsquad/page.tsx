"use client";

import Image from "next/image";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { Pitch, SubmitSquad, Logger, FancyHeader } from "@/components";
import { useGeneralContext } from "@/contexts";
import { useClientAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { createWalletClient, hexToBigInt, http } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient } from "viem";
import {
  WORLDCOIN_VERIFIER_ABI,
  WORLDCOIN_VERIFIER_ADDRESS,
} from "@/utils/constants";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ChooseBet } from "@/components/ChooseBet";

export default function BuildSquad() {
  const { squadGenerated, setSquadGenerated, addLog } = useGeneralContext();
  const { isAuthenticated } = useClientAuth();
  const { primaryWallet } = useDynamicContext();

  const { address } = primaryWallet || {};

  const [amount, setAmount] = useState<number>(0);
  const [worldcoin, setWorldCoin] = useState<any>(null);
  const [worldVerified, setWorldVerified] = useState<boolean>(true);
  const [logs, setLogs] = useState<string[]>([]);
  const handleOnAutofill = () => {
    setLogs((prev) => [...prev, "You squad has been autofilled successfully"]);
    setSquadGenerated(true);
  };

  useEffect(() => {
    if (worldcoin && address) {
      setLogs((prev) => [...prev, "Worldcoin proof generated successfully"]);
      setLogs((prev) => [...prev, worldcoin.proofs]);

      (async function () {
        try {
          console.log("PRIVATE KEY");
          console.log(process.env.NEXT_PUBLIC_PRIVATE_KEY);
          const account = privateKeyToAccount(
            (process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`) || "0x"
          );
          console.log("BASE SEPOLIA");
          console.log(process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL);
          const walletClient = createWalletClient({
            chain: baseSepolia,
            account,
            transport: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL),
          });

          const publicClient = createPublicClient({
            chain: baseSepolia,
            transport: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL),
          });

          console.log([
            address,
            hexToBigInt(worldcoin.merkle_root),
            hexToBigInt(worldcoin.nullifier_hash),
            worldcoin.proofs,
          ]);
          const { request } = await publicClient.simulateContract({
            account,
            address: WORLDCOIN_VERIFIER_ADDRESS,
            abi: WORLDCOIN_VERIFIER_ABI,
            functionName: "verifyAndExecute",
            args: [
              address,
              hexToBigInt(worldcoin.merkle_root),
              hexToBigInt(worldcoin.nullifier_hash),
              worldcoin.proofs,
            ],
          });

          const tx = await walletClient.writeContract(request);
          setLogs((prev) => [...prev, "Worldcoin proof verified on-chain"]);
          setLogs((prev) => [...prev, "https://sepolia.basescan.org/tx/" + tx]);
          setWorldVerified(true);
        } catch (e) {
          setLogs((prev) => [...prev, "Worldcoin proof verification failed"]);
          setLogs((prev) => [...prev, (e as any).toString()]);
          console.log(e);
        }
      })();
    }
  }, [worldcoin, address]);

  return (
    <Box>
      <Container maxWidth="lg" sx={{ marginY: 3 }}>
        <FancyHeader text="Build Squad" />
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyItems="center"
          gap={5}
        >
          <Pitch />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 3,
            }}
          >
            <Stack direction="row" spacing={2}>
              {worldVerified && (
                <>
                  <Button
                    disabled={!isAuthenticated}
                    variant="outlined"
                    color="warning"
                    onClick={handleOnAutofill}
                  >
                    Autofill Squad
                  </Button>

                  <ChooseBet
                    amount={amount}
                    setAmount={(_amount) => {
                      setAmount(_amount);
                    }}
                  />
                </>
              )}
              {!worldVerified && (
                <SubmitSquad
                  setWorldCoin={(data) => {
                    setWorldCoin(data);
                  }}
                />
              )}
            </Stack>
            <Typography variant="h4">Logs</Typography>
            <Logger logs={logs} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
