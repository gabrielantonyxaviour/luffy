'use client';

import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { Pitch } from '@/components';
import { useGeneralContext } from '@/contexts';

export default function GamePlay() {
  const { setSquadGenerated } = useGeneralContext();

  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <Typography variant='h4' marginBottom={3}>
          Game Play
        </Typography>
        <Stack direction='row' alignItems='flex-start' justifyItems='center'>
          <Pitch />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Button
              variant='outlined'
              color='warning'
              onClick={() => setSquadGenerated(true)}
            >
              Generate Squad
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
