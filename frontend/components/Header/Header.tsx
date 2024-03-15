'use client';

import Image from 'next/image';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Links } from './Links';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: 2
};

export const Header = () => {
  return (
    <Box component='nav'>
      <Container sx={styles} maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={0.5}
        >
          <Image src='/logo.svg' alt='logo' width={60} height={60} />
          <Typography variant='h4' component='h3'>
            Luffy
          </Typography>
        </Stack>
        <Links />
        <Typography>Avatar</Typography>
      </Container>
    </Box>
  );
};
