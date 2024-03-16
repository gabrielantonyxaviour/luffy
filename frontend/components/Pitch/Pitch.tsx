import { Box } from '@mui/material';
import { Player } from './Player';
import data from '../../../sample_data.json';

type PlayerType = {
  id: string;
  name: string;
  xPos: string;
  yPos: number;
  nationality: string;
};

const players = data as PlayerType[];

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
  return (
    <Box sx={styles.container}>
      {players.map(({ id, xPos, yPos, name, nationality }) => (
        <Player
          key={id}
          x={xPos}
          y={yPos}
          name={name}
          nationality={nationality}
        />
      ))}
    </Box>
  );
};
