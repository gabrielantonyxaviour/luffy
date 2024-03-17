'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Links } from './Links';
import { CoinPicker, DynamicWidget, EnsWidget } from '@/components';
import { useClientAuth } from '@/hooks';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: 2
};

export const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useClientAuth();

  return (
    <Box component='nav'>
      <Container sx={styles} maxWidth='xl'>
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <Image src='/logo.png' alt='logo' width={84} height={84} />
          <Typography variant='h4' component='h3'>
            Luffy
          </Typography>
        </Stack>
        <Links pathname={pathname} />
        {isAuthenticated && <CoinPicker />}
        <Stack direction='row' alignItems='center' spacing={1.5}>
          <EnsWidget />
          <DynamicWidget />
        </Stack>
      </Container>
    </Box>
  );
};
