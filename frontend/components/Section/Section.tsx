import { Box, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { FancyHeader } from '../FancyHeader';

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
      <FancyHeader text={title} />
      {children}
    </Box>
  );
};
