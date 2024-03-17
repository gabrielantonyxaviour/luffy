import { Box, Typography, Container } from '@mui/material';
import { FancyHeader } from '@/components';

export default function Leaderboard() {
  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <FancyHeader text='Leaderboard' />
      </Container>
    </Box>
  );
}
