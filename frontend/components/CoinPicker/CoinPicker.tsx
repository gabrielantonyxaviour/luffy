'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Stack
} from '@mui/material';
import Image from 'next/image';

export const CoinPicker = () => {
  const [coin, setCoin] = useState('CHZ');

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId='coin-select-label'
          id='coin-select'
          value={coin}
          onChange={handleChange}
          size='small'
        >
          <MenuItem value='CHZ'>
            <Stack direction='row' justifyContent='center' alignItems='center'>
              <Image src='/coins/chz.png' alt='chz' width={22} height={22} />
              <Typography variant='body1' marginLeft={1} marginRight={0.5}>
                550
              </Typography>
              <Typography variant='body1' color='#FE014B'>
                CHZ
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value='APE'>
            <Stack direction='row' justifyContent='center' alignItems='center'>
              <Image src='/coins/ape.png' alt='ape' width={22} height={22} />
              <Typography variant='body1' marginLeft={1} marginRight={0.5}>
                880
              </Typography>
              <Typography variant='body1' color='#266FE0'>
                APE
              </Typography>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
