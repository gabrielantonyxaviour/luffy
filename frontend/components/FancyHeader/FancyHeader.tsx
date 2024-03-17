import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';

type FancyHeaderProps = {
  text: string;
};

export const FancyHeader: React.FC<FancyHeaderProps> = ({ text }) => {
  return (
    <Box marginBottom={3}>
      <Stack direction='row' alignItems='center' spacing={1.5}>
        <Typography variant='h4'>{text}</Typography>
        <Image src='/glasses.gif' alt='classes' width={50} height={20} />
      </Stack>
    </Box>
  );
};
