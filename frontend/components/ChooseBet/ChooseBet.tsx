"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Stack,
  Input,
  styled,
  Button,
} from "@mui/material";
import Image from "next/image";
import {
  createWalletClientFromWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import {
  createPublicClient,
  formatUnits,
  hexToBigInt,
  http,
  parseEther,
} from "viem";
import { sepolia, spicy } from "viem/chains";
import {
  APECOIN_SEPOLIA_ADDRESS,
  ERC20_ABI,
  LUFFY_REWARDS_ABI,
  LUFFY_REWARDS_CHILIZ_ADDRESS,
  LUFFY_REWARDS_SEPOLIA_ADDRESS,
} from "@/utils/constants";
import { useGeneralContext } from "@/contexts";

export const ChooseBet = ({
  amount,
  setAmount,
  setChainId,
}: {
  amount: number;
  setAmount: (amount: number) => void;
  setChainId: (chainId: number) => void;
}) => {
  const [coin, setCoin] = useState("CHZ");
  const { network, setNetwork } = useDynamicContext();
  const { primaryWallet } = useDynamicContext();
  const { nullifierHash } = useGeneralContext();
  const placeBet = async () => {
    if (primaryWallet) {
      console.log(network);
      if (coin == "CHZ") {
        if (network != 88882) setNetwork(88882);

        const publicClient = createPublicClient({
          chain: spicy,
          transport: http(process.env.NEXT_PUBLIC_CHILIZ_URL),
        });
        const walletClient = await createWalletClientFromWallet(primaryWallet);
        console.log("NULLIFIER HASH");
        console.log(nullifierHash);
        const { request } = await publicClient.simulateContract({
          address: LUFFY_REWARDS_CHILIZ_ADDRESS,
          abi: LUFFY_REWARDS_ABI,
          functionName: "betAmount",
          args: [
            3,
            0, //hexToBigInt(nullifierHash as `0x${string}`),
            parseEther(amount.toString()),
          ],
          account: primaryWallet.address as `0x${string}`,
          value: parseEther(amount.toString()),
        });
        const tx = await walletClient.writeContract(request);
        console.log(tx);
      } else if (coin == "APE") {
        if (network != 11155111) setNetwork(11155111);

        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(process.env.NEXT_PUBLIC_SEPOLIA_URL),
        });
        const walletClient = await createWalletClientFromWallet(primaryWallet);

        const { request: approvalTx } = await publicClient.simulateContract({
          address: APECOIN_SEPOLIA_ADDRESS,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [LUFFY_REWARDS_SEPOLIA_ADDRESS, parseEther(amount.toString())],
        });
        const approvalTxHash = await walletClient.writeContract(approvalTx);
        console.log(approvalTxHash);
        const { request: placeBetTx } = await publicClient.simulateContract({
          address: LUFFY_REWARDS_SEPOLIA_ADDRESS,
          abi: LUFFY_REWARDS_ABI,
          functionName: "betAmount",
          args: [
            1,
            hexToBigInt(nullifierHash as `0x${string}`),
            parseEther(amount.toString()),
          ],
          account: primaryWallet.address as `0x${string}`,
          value: parseEther(amount.toString()),
        });
        const tx = await walletClient.writeContract(placeBetTx);
        console.log(tx);
      }
      console.log("Placing bet");
    } else {
      console.log("No wallet connected");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
    setChainId(event.target.value == "CHZ" ? 88882 : 11155111);
  };
  const StyledInput = styled("input")({
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "-moz-appearance": "textfield", // Firefox
  });

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stack direction={"row"} spacing={1} marginY={"auto"}>
        <Input
          type="text"
          inputComponent={StyledInput}
          value={amount}
          onChange={(e) => {
            if (isNaN(parseInt(e.target.value))) setAmount(0);
            else setAmount(parseInt(e.target.value));
          }}
          style={{
            color: "#ffffff",
            border: "1px solid #ffffff22",
            borderRadius: 2,
            padding: 2,
            width: "40%",
            textAlign: "center",
            fontWeight: 500,
          }}
        />
        <FormControl>
          <Select
            labelId="coin-select-label"
            id="coin-select"
            value={coin}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="CHZ">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Image src="/coins/chz.png" alt="chz" width={22} height={22} />

                <Typography variant="body1" color="#FE014B" marginLeft={1.5}>
                  CHZ
                </Typography>
              </Stack>
            </MenuItem>
            <MenuItem value="APE">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Image src="/coins/ape.png" alt="ape" width={22} height={22} />

                <Typography variant="body1" color="#266FE0" marginLeft={1.5}>
                  APE
                </Typography>
              </Stack>
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={amount == 0}
          variant="outlined"
          color="success"
          onClick={placeBet}
        >
          Place Bet
        </Button>
      </Stack>
    </Box>
  );
};
