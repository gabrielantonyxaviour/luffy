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
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const ChooseBet = ({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (amount: number) => void;
}) => {
  const [coin, setCoin] = useState("CHZ");
  const { network, setNetwork } = useDynamicContext();

  const placeBet = () => {
    console.log(network);
    if (coin == "CHZ" && network != 88882) {
      setNetwork(88882);
    } else if (coin == "APE" && network != 11155111) {
      setNetwork(11155111);
    }
    console.log("Placing bet");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
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
