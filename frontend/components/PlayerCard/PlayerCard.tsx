'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import { useClientAuth } from '@/hooks';
import { useGeneralContext } from '@/contexts';

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
  const { isAuthenticated } = useClientAuth();
  const { squadGenerated } = useGeneralContext();
  const isUnknown = !isAuthenticated || !squadGenerated;

  const imageSrc = isUnknown
    ? '/teams/avatar.png'
    : `/teams/${nationality?.toLowerCase()}.png`;
  const imageAlt = isUnknown ? 'unknown' : 'player';
  const buttnText = isUnknown ? 'Select Player' : 'Change Player';

  return (
    <Box sx={styles.container}>
      <Image src={imageSrc} alt={imageAlt} width={100} height={120} />
      {!isUnknown && (
        <Typography variant='h6' marginTop={2}>
          {name}
        </Typography>
      )}
      <Typography variant='body2' marginBottom={2}>
        {positionMap[position as keyof typeof positionMap]}
      </Typography>
      <Link href='buildsquad'>
        <Button variant='outlined' color='warning'>
          {buttnText}
        </Button>
      </Link>
    </Box>
  );
};
