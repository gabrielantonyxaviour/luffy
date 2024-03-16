'use client';

import Link from 'next/link';
import { Box, Button, Theme, Typography, Container } from '@mui/material';

const styles = (theme: Theme) => ({
  container: {
    backgroundImage: `url('/hero.jpeg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    height: '550px',
    paddingX: '32px',
    paddingY: '64px'
  },
  subtext: {
    marginY: '16px',
    background: 'linear-gradient(90deg, #FFD600 0%, #F00 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    width: '250px'
  }
});

export const Hero = () => {
  return (
    <Box sx={(theme) => styles(theme).container}>
      <Container maxWidth='xl'>
        <Typography variant='h2'>Luffy</Typography>
        <Typography variant='h4' sx={(theme) => styles(theme).subtext}>
          The web3 game for all football fans!
        </Typography>
        <Link href='/buildsquad'>
          <Button variant='contained'>Play Now</Button>
        </Link>
      </Container>
    </Box>
  );
};
