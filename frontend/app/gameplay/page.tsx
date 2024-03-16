'use client';

import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { Pitch, SubmitSquad, Logger } from '@/components';
import { useGeneralContext } from '@/contexts';
import { useClientAuth } from '@/hooks';

export default function GamePlay() {
  const { squadGenerated, setSquadGenerated, addLog } = useGeneralContext();
  const { isAuthenticated } = useClientAuth();

  const handleOnAutofill = () => {
    addLog('You squad has been autofilled successfully!');
    setSquadGenerated(true);
  };

  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <Typography variant='h4' marginBottom={3}>
          Game Play
        </Typography>
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
            <Stack direction='row' spacing={2}>
              <Button
                disabled={!isAuthenticated}
                variant='outlined'
                color='warning'
                onClick={handleOnAutofill}
              >
                Autofill Squad
              </Button>
              <SubmitSquad isDisabled={!isAuthenticated || !squadGenerated} />
            </Stack>
            <Typography variant='h4'>Logs</Typography>
            <Logger />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
