import data from '../../sample_data.json';

type PlayerType = {
  id: string;
  name: string;
  position: string;
  xPos: string;
  yPos: number;
  nationality: string;
};

export const players = data as PlayerType[];
