"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { sepolia, spicy } from "viem/chains";
import { createPublicClient, formatEther, http, parseUnits } from "viem";
import { APECOIN_SEPOLIA_ADDRESS, ERC20_ABI } from "@/utils/constants";

export const CoinPicker = () => {
  const [coin, setCoin] = useState("CHZ");
  const [chilizBalance, setChilizBalance] = useState("0");
  const [apeBalance, setApeBalance] = useState("0");
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    (async function () {
      if (primaryWallet) {
        const chilizPublicClient = createPublicClient({
          chain: spicy,
          transport: http(process.env.NEXT_PUBLIC_CHILIZ_URL || ""),
        });

        const sepoliaPublicClient = createPublicClient({
          chain: sepolia,
          transport: http(process.env.NEXT_PUBLIC_SEPOLIA_URL || ""),
        });

        const result = await chilizPublicClient.getBalance({
          address: primaryWallet.address as `0x${string}`,
        });

        const data = await sepoliaPublicClient.readContract({
          address: APECOIN_SEPOLIA_ADDRESS,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [primaryWallet.address as `0x${string}`],
        });

        console.log("APE Balance");
        console.log(data);
        setApeBalance(formatEther(data as bigint));

        console.log("CHZ Balance");
        console.log(formatEther(result));
        setChilizBalance(formatEther(result));
      } else {
        console.log("No primary wallet");
      }
    })();
  }, [primaryWallet, coin]);

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="coin-select-label"
          id="coin-select"
          value={coin}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="CHZ">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Image src="/coins/chz.png" alt="chz" width={22} height={22} />
              <Typography variant="body1" marginLeft={1} marginRight={0.5}>
                {chilizBalance}
              </Typography>
              <Typography variant="body1" color="#FE014B">
                CHZ
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value="APE">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Image src="/coins/ape.png" alt="ape" width={22} height={22} />
              <Typography variant="body1" marginLeft={1} marginRight={0.5}>
                {apeBalance}
              </Typography>
              <Typography variant="body1" color="#266FE0">
                APE
              </Typography>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
