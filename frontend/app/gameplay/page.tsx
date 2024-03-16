import { Box, Container, Typography } from '@mui/material';
import { Pitch } from '@/components';

export default function GamePlay() {
  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <Typography variant='h4' marginBottom={3}>
          Game Play
        </Typography>
        <Pitch />
      </Container>
    </Box>
  );
}
