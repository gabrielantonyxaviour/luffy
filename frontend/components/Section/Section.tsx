import { Box, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

const styles = {
  container: {
    marginTop: 8,
    marginBottom: 12
  }
};

type SectionProps = {
  title: string;
} & PropsWithChildren;

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant='h4' marginBottom={4}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
