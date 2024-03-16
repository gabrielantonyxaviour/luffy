import { Box, Container, Typography } from '@mui/material';
import { Hero } from '@/components';

export default function Home() {
  return (
    <Box>
      <Hero />
      <Container maxWidth='xl'>
        {/* <Typography variant='h5'>Home</Typography> */}
      </Container>
    </Box>
  );
}
