import Image from 'next/image';
import { Box, Stack } from '@mui/material';

const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

const styles = {
  backgroundColor: '#123',
  padding: 4,
  display: 'flex',
  columnGap: 25,
  rowGap: 5,
  flexWrap: 'wrap',
  borderRadius: 2
};

export const Sponsors = () => {
  return (
    <Box sx={styles}>
      {ids.map((id) => (
        <Image
          src={`/sponsors/${id}.png`}
          alt={`sponsor${id}`}
          key={id}
          width={50}
          height={50}
        />
      ))}
    </Box>
  );
};
