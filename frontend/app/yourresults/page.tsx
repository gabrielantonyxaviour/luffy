"use client";
import { Container, Typography, Box, Stack } from "@mui/material";
import circuit from "@/utils/circuit.json";
import { Pitch, Logger, ResultsCard, FancyHeader } from "@/components";
import { useState } from "react";
import computeMerkleRoot from "@/utils/cryptography-helpers/computeMerkleRoot";
import computeMerklePath from "@/utils/cryptography-helpers/computeMerklePath";
import {
  bytesToHex,
  createPublicClient,
  createWalletClient,
  hashMessage,
  hexToBytes,
  http,
  recoverPublicKey,
  toBytes,
} from "viem";
import computeSquadHash from "@/utils/cryptography-helpers/computeSquadHash";
import {
  BarretenbergBackend,
  CompiledCircuit,
} from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import {
  createWalletClientFromWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { arbitrumSepolia } from "viem/chains";
import { useGeneralContext } from "@/contexts";
import { LUFFY_PROTOCOL_ABI, LUFFY_PROTOCOL_ADDRESS } from "@/utils/constants";

export default function YourResults() {
  const [logs, setLogs] = useState<string[]>([]);
  const [proof, setProof] = useState<string>(""); // [u8; 32][
  const { primaryWallet } = useDynamicContext();
  const { nullifierHash } = useGeneralContext();

  async function triggerTransaction(
    walletClient: any,
    publicClient: any,
    proof: string,
    total_points: number
  ) {
    const { request } = await publicClient.simulateContract({
      address: LUFFY_PROTOCOL_ADDRESS,
      abi: LUFFY_PROTOCOL_ABI,
      functionName: "claimRewards",
      args: [nullifierHash, total_points, proof, true],
    });

    const tx = await walletClient.writeContract(request);
    setLogs((prev) => [...prev, "Transaction confirmed! 🎉"]);
    setLogs((prev) => [
      ...prev,
      `https://sepolia.arbiscan.io/tx/${tx.transactionHash}`,
    ]);
  }

  async function generateProof() {
    try {
      let player_ids: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
      ] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // [u8; 11]
      let player_ids_secret: `0x${string}` =
        "0x6a7b4e73f99ad819e9d9b26d52c87c90bc963f4d14d6cbb62f0010f18de1cb31"; // [u8; 32]
      let player_points: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
      ] = [4, 24, 25, 18, 18, 36, 30, 30, 15, 14, 12]; // [u8; 11]
      const all_points = [
        4, 24, 25, 18, 18, 36, 30, 30, 15, 14, 12, 0, 0, 0, 0, 0,
      ];
      const total_points = 246;
      let all_points_root: `0x${string}` = computeMerkleRoot(all_points); // [u8; 32]
      let points_merkle_paths: `0x${string}`[][] = []; // [[[u8; 32]; 4]; 11]
      for (let i = 0; i < 11; i++) {
        points_merkle_paths.push(computeMerklePath(player_ids[i], all_points));
      }
      let player_ids_secret_array = hexToBytes(player_ids_secret);
      const combinedArray = new Uint8Array(43);
      combinedArray.set(player_ids, 0);
      combinedArray.set(player_ids_secret_array, 11);
      let squad_hash: `0x${string}` = computeSquadHash(combinedArray); // [u8; 32]
      console.log("SQUAD HASH");
      console.log(squad_hash);
      const backend = new BarretenbergBackend(circuit as CompiledCircuit);
      const noir = new Noir(circuit as CompiledCircuit, backend);
      if (primaryWallet === null) return;
      const walletClient = await createWalletClientFromWallet(primaryWallet);
      const publicClient = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(process.env.NEXT_PUBLIC_ARB_SEPOLIA_URL),
      });
      const sig = Buffer.from(
        (
          await walletClient.signMessage({
            account: primaryWallet.address as `0x${string}`,
            message: squad_hash,
          })
        ).slice(2),
        "hex"
      );

      const publicKey = await recoverPublicKey({
        hash: Buffer.from(hashMessage({ raw: squad_hash }).slice(2), "hex"),
        signature: sig,
      });
      const publicKeyBuffer = Buffer.from(publicKey.slice(2), "hex");
      const trimmedSig = new Uint8Array(sig.subarray(0, sig.length - 1));

      // Extract x and y coordinates
      const xCoordHex = Array.from(publicKeyBuffer.subarray(1, 33)).map(
        (byte) => `${byte}`
      );
      const yCoordHex = Array.from(publicKeyBuffer.subarray(33)).map(
        (byte) => `${byte}`
      );
      setLogs((prev) => [...prev, "Generating proof... ⏳"]);
      console.log({
        signer_pub_x_key: Array.from(xCoordHex).map((byte) => `${byte}`),
        signer_pub_y_key: Array.from(yCoordHex).map((byte) => `${byte}`),
        signature: Array.from(trimmedSig).map((byte) => `${byte}`),
        squad_player_ids: Array.from(player_ids).map((byte) => `${byte}`),
        squad_points: Array.from(player_points).map((byte) => `${byte}`),
        player_points_merkle_paths: points_merkle_paths.map(
          (points_merkle_path) =>
            points_merkle_path.map((element) =>
              Array.from(toBytes(element)).map((byte) => `${byte}`)
            )
        ),
        player_points_root: Array.from(toBytes(all_points_root)).map(
          (byte) => `${byte}`
        ),
        squad_hash: Array.from(
          Buffer.from(hashMessage({ raw: squad_hash }).slice(2), "hex")
        ).map((byte) => `${byte}`),
        totalPoints: total_points,
      });

      const proof = await noir.generateFinalProof({
        signer_pub_x_key: Array.from(xCoordHex).map((byte) => `${byte}`),
        signer_pub_y_key: Array.from(yCoordHex).map((byte) => `${byte}`),
        signature: Array.from(trimmedSig).map((byte) => `${byte}`),
        squad_player_ids: Array.from(player_ids).map((byte) => `${byte}`),
        squad_points: Array.from(player_points).map((byte) => `${byte}`),
        player_points_merkle_paths: points_merkle_paths.map(
          (points_merkle_path) =>
            points_merkle_path.map((element) =>
              Array.from(toBytes(element)).map((byte) => `${byte}`)
            )
        ) as any,
        player_points_root: Array.from(toBytes(all_points_root)).map(
          (byte) => `${byte}`
        ),
        squad_hash: Array.from(
          Buffer.from(hashMessage({ raw: squad_hash }).slice(2), "hex")
        ).map((byte) => `${byte}`),
        total_points: total_points,
      });
      console.log(proof);

      console.log("SQUAD HASH");
      console.log(squad_hash);
      console.log("PLAYER POINTS ROOT");
      console.log(all_points_root);
      console.log(bytesToHex(proof.proof));

      setProof(bytesToHex(proof.proof));
      setLogs((prev) => [...prev, "Proof Generation Success 😏"]);
      setLogs((prev) => [...prev, "Verifying proof... ⏳"]);
      const isValid = await noir.verifyFinalProof(proof);

      if (isValid) {
        setLogs((prev) => [...prev, "Proof verified ✅"]);

        await triggerTransaction(
          walletClient,
          publicClient,
          bytesToHex(proof.proof),
          total_points
        );
      } else {
        setLogs((prev) => [...prev, "Proof verification failed ❌"]);
      }
      const totalPoints = total_points;
      const nullifier = nullifierHash;
      const isChiliz = true;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Box>
      <Container maxWidth="lg" sx={{ marginY: 3 }}>
        <FancyHeader text="Your Results" />
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyItems="center"
          gap={5}
        >
          <Pitch
            results={[
              "4",
              "24",
              "25",
              "18",
              "18",
              "36",
              "30",
              "30",
              "15",
              "14",
              "12",
            ]}
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
            <ResultsCard
              points={"246"}
              rewards="12"
              currency="CHZ"
              generateProof={generateProof}
            />
            <Typography variant="h4">Logs</Typography>
            <Logger logs={logs} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
