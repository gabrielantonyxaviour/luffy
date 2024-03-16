'use client';

import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { Pitch, SubmitSquad } from '@/components';
import { useGeneralContext } from '@/contexts';
import { useClientAuth } from '@/hooks';

export default function GamePlay() {
  const { squadGenerated, setSquadGenerated } = useGeneralContext();
  const { isAuthenticated } = useClientAuth();

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
            <Stack direction='row' spacing={2}>
              <Button
                disabled={!isAuthenticated}
                variant='outlined'
                color='warning'
                onClick={() => setSquadGenerated(true)}
              >
                Autofill Squad
              </Button>
              <SubmitSquad isDisabled={!isAuthenticated || !squadGenerated} />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
