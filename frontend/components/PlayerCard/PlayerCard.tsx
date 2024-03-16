import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';

const styles = {
  container: {
    width: '240px',
    minWidth: '240px',
    backgroundColor: '#123',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 2
  }
};

type PlayerCardProps = {
  name: string;
  position: string;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ name, position }) => {
  return (
    <Box sx={styles.container}>
      <Image src='/bank.png' alt='player' width={120} height={120} />
      <Typography variant='h6' marginTop={2}>
        {name}
      </Typography>
      <Typography variant='body2' marginBottom={2}>
        {position}
      </Typography>
      <Button variant='outlined' color='warning'>
        Change Player
      </Button>
    </Box>
  );
};
