import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';

const styles = {
  container: {
    width: '240px',
    minWidth: '240px',
    backgroundColor: '#102640',
    border: '1px solid #ffffff22',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 2
  }
};

const positionMap = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward'
};

type PlayerCardProps = {
  name: string;
  position: string;
  nationality: string;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  position,
  nationality
}) => {
  return (
    <Box sx={styles.container}>
      <Image
        src={`/teams/${nationality?.toLowerCase()}.png`}
        alt='player'
        width={100}
        height={120}
      />
      <Typography variant='h6' marginTop={2}>
        {name}
      </Typography>
      <Typography variant='body2' marginBottom={2}>
        {positionMap[position as keyof typeof positionMap]}
      </Typography>
      <Link href='gameplay'>
        <Button variant='outlined' color='warning'>
          Change Player
        </Button>
      </Link>
    </Box>
  );
};
