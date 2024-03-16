import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { Pitch } from '@/components';

export default function GamePlay() {
  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginTop: 3 }}>
        <Typography variant='h4' marginBottom={3}>
          Game Play
        </Typography>
        <Pitch />
      </Container>
    </Box>
  );
}
