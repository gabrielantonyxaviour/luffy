"use client";

import Image from "next/image";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import { Pitch, SubmitSquad, Logger, FancyHeader } from "@/components";
import { useGeneralContext } from "@/contexts";
import { useClientAuth } from "@/hooks";
import { use, useEffect, useState } from "react";
import { createWalletClient, hexToBigInt, http } from "viem";
import { arbitrumSepolia, baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient } from "viem";
import {
  LUFFY_PROTOCOL_ABI,
  LUFFY_PROTOCOL_ADDRESS,
  WORLDCOIN_VERIFIER_ABI,
  WORLDCOIN_VERIFIER_ADDRESS,
} from "@/utils/constants";
import {
  createWalletClientFromWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { ChooseBet } from "@/components/ChooseBet";
import computeMerkleRoot from "@/utils/cryptography-helpers/computeMerkleRoot";

export default function BuildSquad() {
  const { squadGenerated, setSquadGenerated, addLog } = useGeneralContext();
  const { isAuthenticated } = useClientAuth();
  const { primaryWallet, setNetwork, network } = useDynamicContext();
  const { setNullifierHash } = useGeneralContext();
  const { nullifierHash } = useGeneralContext();
  const { address } = primaryWallet || {};

  const [amount, setAmount] = useState<number>(0);
  const [betChainId, setBetChainId] = useState<number>(0);
  const [worldcoin, setWorldCoin] = useState<any>(null);
  const [worldVerified, setWorldVerified] = useState<boolean>(false);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const handleOnAutofill = () => {
    setLogs((prev) => [...prev, "You squad has been autofilled successfully"]);
    setSquadGenerated(true);
  };

  useEffect(() => {
    if (!worldVerified) {
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
            setNullifierHash(worldcoin.nullifier_hash);
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
            setLogs((prev) => [
              ...prev,
              "https://sepolia.basescan.org/tx/" + tx,
            ]);
            setWorldVerified(true);
          } catch (e) {
            setLogs((prev) => [...prev, "Please Retry again"]);
            console.log(e);
          }
        })();
      }
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
          <Pitch
            results={["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]}
          />
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
              {worldVerified && betPlaced && (
                <Button
                  variant="outlined"
                  color="info"
                  onClick={async () => {
                    // create squad
                    if (primaryWallet) {
                      if (network != 421614) setNetwork(421614);
                      console.log("Creating squad");

                      const squad = [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0,
                      ];
                      const merkleRoot = computeMerkleRoot(squad);

                      const publicClient = createPublicClient({
                        chain: arbitrumSepolia,
                        transport: http(
                          process.env.NEXT_PUBLIC_ARB_SEPOLIA_URL
                        ),
                      });
                      console.log(process.env.NEXT_PUBLIC_ARB_SEPOLIA_URL);
                      const walletClient = await createWalletClientFromWallet(
                        primaryWallet
                      );
                      console.log([
                        1,
                        merkleRoot, //hexToBigInt(nullifierHash as `0x${string}`),
                        primaryWallet.address as `0x${string}`,
                        nullifierHash == "" ? 0 : nullifierHash,
                      ]);
                      const { request } = await publicClient.simulateContract({
                        address: LUFFY_PROTOCOL_ADDRESS,
                        abi: LUFFY_PROTOCOL_ABI,
                        functionName: "registerSquad",
                        args: [
                          1,
                          merkleRoot, //hexToBigInt(nullifierHash as `0x${string}`),
                          primaryWallet.address as `0x${string}`,
                          nullifierHash == "" ? 0 : nullifierHash,
                        ],
                        account: primaryWallet.address as `0x${string}`,
                      });

                      const tx = await walletClient.writeContract(request);
                      console.log(tx);
                    }
                  }}
                >
                  Submit Squad
                </Button>
              )}
              {worldVerified && !betPlaced && (
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
                    setChainId={(chainId: number) => {
                      setBetChainId(chainId);
                    }}
                    setAmount={(_amount) => {
                      setAmount(_amount);
                    }}
                    log={(log: string) => {
                      setLogs((prev) => [...prev, log]);
                    }}
                    setBetPlaced={(placed: boolean) => {
                      setBetPlaced(placed);
                    }}
                  />
                </>
              )}
              {!worldVerified && !betPlaced && (
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
