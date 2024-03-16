'use client';

import { Box } from '@mui/material';
import { Player } from './Player';
import { players } from '@/data';
import { useGeneralContext } from '@/contexts';

const styles = {
  container: {
    width: '550px',
    height: '900px',
    backgroundImage: `url('/pitch.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative'
  }
};

export const Pitch = () => {
  const { squadSubmitted } = useGeneralContext();

  return (
    <Box sx={styles.container}>
      {players.map(({ id, xPos, yPos, name, nationality }) => (
        <Player
          key={id}
          x={xPos}
          y={yPos}
          name={name}
          nationality={nationality}
          isUnknown={!squadSubmitted}
        />
      ))}
    </Box>
  );
};
