'use client';

import { Typography } from '@mui/material';
import { useGeneralContext } from '@/contexts';
import { useClientAuth } from '@/hooks';

export const EnsWidget = () => {
  const { ens } = useGeneralContext();
  const { isAuthenticated } = useClientAuth();

  if (!isAuthenticated) return null;

  return <Typography variant='h6'>{ens}</Typography>;
};
