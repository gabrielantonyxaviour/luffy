import { SvgIcon, SvgIconProps } from '@mui/material';
import WorldcoinSvg from './worldcoin.svg';

export const Worldcoin = (props: SvgIconProps) => {
  return <SvgIcon component={WorldcoinSvg} inheritViewBox {...props} />;
};
