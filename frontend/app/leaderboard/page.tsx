import { Box, Typography, Container } from '@mui/material';

export default function Leaderboard() {
  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginY: 3 }}>
        <Typography variant='h4'>Leaderboard</Typography>
      </Container>
    </Box>
  );
}
