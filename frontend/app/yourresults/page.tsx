'use client';

import Image from 'next/image';
import { Container, Typography, Box, Stack } from '@mui/material';
import { Pitch, Logger, ResultsCard, FancyHeader } from '@/components';
import { useState } from 'react';

export default function YourResults() {
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <FancyHeader text='Your Results' />
        <Stack
          direction='row'
          alignItems='flex-start'
          justifyItems='center'
          gap={5}
        >
          <Pitch />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: 3
            }}
          >
            <ResultsCard />
            <Typography variant='h4'>Logs</Typography>
            <Logger logs={logs} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
