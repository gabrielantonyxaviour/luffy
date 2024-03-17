'use client';

import Image from 'next/image';
import { Container, Typography, Box, Stack } from '@mui/material';
import { Pitch, Logger, ResultsCard } from '@/components';

export default function YourResults() {
  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <Box position='relative'>
          <Typography variant='h4' marginBottom={3}>
            Your Results
          </Typography>
          <Box position='absolute' top={-22} left={150}>
            <Image src='/glasses.gif' alt='classes' width={100} height={100} />
          </Box>
        </Box>
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
            <Logger />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
